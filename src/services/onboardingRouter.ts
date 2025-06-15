// Intelligent Onboarding Router - Smart routing system for provider onboarding
// Guides users through optimal sequence: Market Education → Revenue Calculator → Contract Terms → Quick Setup → PSA

import { supabase } from '@/lib/supabase';

export interface OnboardingStep {
  id: string;
  name: string;
  title: string;
  description: string;
  route: string;
  order: number;
  required: boolean;
  estimatedTime: string;
  valueProposition: string;
}

export interface UserProgress {
  userId: string;
  currentStep: string;
  completedSteps: string[];
  progressPercentage: number;
  lastActivity: Date;
  skipCount: number;
  timeSpent: Record<string, number>;
}

export class OnboardingRouter {
  private static instance: OnboardingRouter;
  private userProgress: Map<string, UserProgress> = new Map();

  // Define the optimal onboarding sequence
  private readonly ONBOARDING_STEPS: OnboardingStep[] = [
    {
      id: 'market_education',
      name: 'Market Education',
      title: 'Discover Your Market Opportunity',
      description: 'Learn about teleradiology demand and revenue potential in your area',
      route: '/dashboard/onboarding/market-education',
      order: 1,
      required: false,
      estimatedTime: '3-5 min',
      valueProposition: 'Understand your earning potential before committing time'
    },
    {
      id: 'revenue_calculator',
      name: 'Revenue Calculator',
      title: 'Calculate Your Revenue Potential',
      description: 'Get personalized revenue projections based on your location and specialties',
      route: '/dashboard/onboarding/revenue-calculator',
      order: 2,
      required: false,
      estimatedTime: '2-3 min',
      valueProposition: 'See exact earnings before entering detailed information'
    },
    {
      id: 'contract_terms',
      name: 'Contract Terms',
      title: 'Review Partnership Terms',
      description: 'Understand the partnership structure and commitment requirements',
      route: '/dashboard/onboarding/contract-terms',
      order: 3,
      required: true,
      estimatedTime: '5-7 min',
      valueProposition: 'Clear expectations and transparent terms upfront'
    },
    {
      id: 'quick_setup',
      name: 'Quick Setup',
      title: 'Complete Your Profile',
      description: 'Fast profile setup with smart auto-population from your information',
      route: '/dashboard/onboarding/quick-setup',
      order: 4,
      required: true,
      estimatedTime: '8-12 min',
      valueProposition: 'Streamlined setup with pre-filled information'
    },
    {
      id: 'psa_signing',
      name: 'PSA Signing',
      title: 'Sign Provider Agreement',
      description: 'Complete your onboarding with digital PSA signing',
      route: '/dashboard/onboarding/enhanced-psa',
      order: 5,
      required: true,
      estimatedTime: '3-5 min',
      valueProposition: 'Final step to activate your partnership'
    }
  ];

  private constructor() {
    this.initializeRouter();
  }

  public static getInstance(): OnboardingRouter {
    if (!OnboardingRouter.instance) {
      OnboardingRouter.instance = new OnboardingRouter();
    }
    return OnboardingRouter.instance;
  }

  private async initializeRouter(): Promise<void> {
    console.log('🚀 Initializing Onboarding Router...');
    
    // Listen for user progress updates
    this.setupProgressTracking();
    
    // Listen for route changes
    this.setupRouteDetection();
    
    console.log('✅ Onboarding Router initialized');
  }

  // Determine the next optimal step for a user
  public async getNextStep(userId: string): Promise<OnboardingStep | null> {
    const progress = await this.getUserProgress(userId);
    const completedSteps = progress?.completedSteps || [];
    
    // Find the next incomplete step in order
    const nextStep = this.ONBOARDING_STEPS
      .filter(step => !completedSteps.includes(step.id))
      .sort((a, b) => a.order - b.order)[0];
    
    console.log(`📍 Next step for user ${userId}:`, nextStep?.name || 'Complete');
    return nextStep || null;
  }

  // Get current step based on URL or user state
  public getCurrentStep(currentPath: string): OnboardingStep | null {
    return this.ONBOARDING_STEPS.find(step => 
      currentPath.includes(step.route) || currentPath.endsWith(step.id)
    ) || null;
  }

  // Determine if user should be redirected from current location
  public async shouldRedirect(userId: string, currentPath: string): Promise<{
    shouldRedirect: boolean;
    redirectTo?: string;
    reason?: string;
  }> {
    // Skip redirect logic for certain paths
    const skipPaths = ['/login', '/api', '/dashboard/settings', '/dashboard/facilities'];
    if (skipPaths.some(path => currentPath.includes(path))) {
      return { shouldRedirect: false };
    }

    const progress = await this.getUserProgress(userId);
    const nextStep = await this.getNextStep(userId);

    // If user is on onboarding path, check if it's the right step
    if (currentPath.includes('/dashboard/onboarding/')) {
      const currentStep = this.getCurrentStep(currentPath);
      
      if (!currentStep) {
        return {
          shouldRedirect: true,
          redirectTo: nextStep?.route || '/dashboard',
          reason: 'Invalid onboarding step'
        };
      }

      // Check if user is trying to skip ahead
      if (nextStep && currentStep.order > nextStep.order) {
        return {
          shouldRedirect: true,
          redirectTo: nextStep.route,
          reason: `Complete ${nextStep.name} first`
        };
      }

      return { shouldRedirect: false };
    }

    // If user is on dashboard but has incomplete onboarding
    if (currentPath.includes('/dashboard') && nextStep) {
      // Allow 3 visits to dashboard before requiring onboarding completion
      const skipCount = progress?.skipCount || 0;
      if (skipCount >= 3) {
        return {
          shouldRedirect: true,
          redirectTo: nextStep.route,
          reason: 'Complete onboarding to access full features'
        };
      }

      // Increment skip count
      await this.incrementSkipCount(userId);
      return { shouldRedirect: false };
    }

    return { shouldRedirect: false };
  }

  // Get user's onboarding progress
  public async getUserProgress(userId: string): Promise<UserProgress | null> {
    try {
      // Check local cache first
      if (this.userProgress.has(userId)) {
        return this.userProgress.get(userId)!;
      }

      // Fetch from database
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('onboarding_step, onboarding_completed_steps, onboarding_progress, onboarding_skip_count, updated_at')
        .eq('user_id', userId)
        .single();

      if (!profile) {
        // Create default progress for new user
        const defaultProgress: UserProgress = {
          userId,
          currentStep: 'market_education',
          completedSteps: [],
          progressPercentage: 0,
          lastActivity: new Date(),
          skipCount: 0,
          timeSpent: {}
        };

        await this.saveUserProgress(defaultProgress);
        return defaultProgress;
      }

      const progress: UserProgress = {
        userId,
        currentStep: profile.onboarding_step || 'market_education',
        completedSteps: profile.onboarding_completed_steps || [],
        progressPercentage: profile.onboarding_progress || 0,
        lastActivity: new Date(profile.updated_at),
        skipCount: profile.onboarding_skip_count || 0,
        timeSpent: {}
      };

      // Cache locally
      this.userProgress.set(userId, progress);
      return progress;

    } catch (error) {
      console.error('❌ Error fetching user progress:', error);
      return null;
    }
  }

  // Update user progress when step is completed
  public async completeStep(userId: string, stepId: string): Promise<void> {
    try {
      const progress = await this.getUserProgress(userId) || {
        userId,
        currentStep: stepId,
        completedSteps: [],
        progressPercentage: 0,
        lastActivity: new Date(),
        skipCount: 0,
        timeSpent: {}
      };

      // Add step to completed if not already there
      if (!progress.completedSteps.includes(stepId)) {
        progress.completedSteps.push(stepId);
      }

      // Calculate progress percentage
      const totalSteps = this.ONBOARDING_STEPS.length;
      progress.progressPercentage = Math.round((progress.completedSteps.length / totalSteps) * 100);

      // Update current step to next step
      const nextStep = await this.getNextStep(userId);
      progress.currentStep = nextStep?.id || 'completed';
      progress.lastActivity = new Date();

      await this.saveUserProgress(progress);
      
      // Dispatch progress event
      window.dispatchEvent(new CustomEvent('onboardingProgressUpdate', {
        detail: { userId, step: stepId, progress: progress.progressPercentage }
      }));

      console.log(`✅ Step completed: ${stepId} (${progress.progressPercentage}%)`);

    } catch (error) {
      console.error('❌ Error completing step:', error);
    }
  }

  // Save user progress to database
  private async saveUserProgress(progress: UserProgress): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          onboarding_step: progress.currentStep,
          onboarding_completed_steps: progress.completedSteps,
          onboarding_progress: progress.progressPercentage,
          onboarding_skip_count: progress.skipCount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', progress.userId);

      if (error) throw error;

      // Update local cache
      this.userProgress.set(progress.userId, progress);

    } catch (error) {
      console.error('❌ Error saving user progress:', error);
    }
  }

  // Increment skip count when user bypasses onboarding
  private async incrementSkipCount(userId: string): Promise<void> {
    const progress = await this.getUserProgress(userId);
    if (progress) {
      progress.skipCount += 1;
      await this.saveUserProgress(progress);
    }
  }

  // Get all onboarding steps
  public getOnboardingSteps(): OnboardingStep[] {
    return [...this.ONBOARDING_STEPS];
  }

  // Get step by ID
  public getStep(stepId: string): OnboardingStep | null {
    return this.ONBOARDING_STEPS.find(step => step.id === stepId) || null;
  }

  // Check if onboarding is complete
  public async isOnboardingComplete(userId: string): Promise<boolean> {
    const progress = await this.getUserProgress(userId);
    const requiredSteps = this.ONBOARDING_STEPS.filter(step => step.required);
    
    return requiredSteps.every(step => 
      progress?.completedSteps.includes(step.id)
    );
  }

  // Get onboarding analytics
  public async getOnboardingAnalytics(userId: string): Promise<{
    totalSteps: number;
    completedSteps: number;
    remainingSteps: number;
    estimatedTimeRemaining: string;
    completionPercentage: number;
  }> {
    const progress = await this.getUserProgress(userId);
    const totalSteps = this.ONBOARDING_STEPS.length;
    const completedSteps = progress?.completedSteps.length || 0;
    const remainingSteps = totalSteps - completedSteps;
    
    // Calculate estimated time remaining
    const remainingStepObjects = this.ONBOARDING_STEPS.filter(step => 
      !progress?.completedSteps.includes(step.id)
    );
    
    const totalMinutesRemaining = remainingStepObjects.reduce((total, step) => {
      const timeRange = step.estimatedTime.split('-').map(t => parseInt(t));
      const avgTime = (timeRange[0] + (timeRange[1] || timeRange[0])) / 2;
      return total + avgTime;
    }, 0);

    const estimatedTimeRemaining = totalMinutesRemaining > 60 
      ? `${Math.round(totalMinutesRemaining / 60)}h ${totalMinutesRemaining % 60}m`
      : `${totalMinutesRemaining}m`;

    return {
      totalSteps,
      completedSteps,
      remainingSteps,
      estimatedTimeRemaining,
      completionPercentage: progress?.progressPercentage || 0
    };
  }

  // Setup progress tracking
  private setupProgressTracking(): void {
    // Listen for step completion events
    window.addEventListener('onboardingStepCompleted', async (event: any) => {
      const { userId, stepId } = event.detail;
      await this.completeStep(userId, stepId);
    });

    // Track time spent on pages
    let pageStartTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - pageStartTime;
      // Could save time spent data here
    });
  }

  // Setup route detection
  private setupRouteDetection(): void {
    // Monitor for navigation changes
    const handleRouteChange = async () => {
      const currentPath = window.location.pathname;
      const userId = window.USRadUser?.user?.id;
      
      if (userId) {
        const redirectInfo = await this.shouldRedirect(userId, currentPath);
        
        if (redirectInfo.shouldRedirect && redirectInfo.redirectTo) {
          console.log(`🔄 Redirecting: ${redirectInfo.reason}`);
          
          // Show brief message before redirect
          if (redirectInfo.reason) {
            const notification = document.createElement('div');
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: #3b82f6;
              color: white;
              padding: 12px 16px;
              border-radius: 8px;
              z-index: 10000;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              font-size: 14px;
            `;
            notification.textContent = redirectInfo.reason;
            document.body.appendChild(notification);
            
            setTimeout(() => {
              notification.remove();
              window.location.href = redirectInfo.redirectTo!;
            }, 2000);
          } else {
            window.location.href = redirectInfo.redirectTo;
          }
        }
      }
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange);
    
    // Check current route on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleRouteChange);
    } else {
      handleRouteChange();
    }
  }

  // Reset user progress (for testing)
  public async resetUserProgress(userId: string): Promise<void> {
    const defaultProgress: UserProgress = {
      userId,
      currentStep: 'market_education',
      completedSteps: [],
      progressPercentage: 0,
      lastActivity: new Date(),
      skipCount: 0,
      timeSpent: {}
    };

    await this.saveUserProgress(defaultProgress);
    console.log('🔄 User progress reset');
  }
}

// Export singleton instance
export const onboardingRouter = OnboardingRouter.getInstance();

// Utility functions for easy access
export async function getNextOnboardingStep(userId: string): Promise<OnboardingStep | null> {
  return onboardingRouter.getNextStep(userId);
}

export async function completeOnboardingStep(userId: string, stepId: string): Promise<void> {
  return onboardingRouter.completeStep(userId, stepId);
}

export async function isUserOnboardingComplete(userId: string): Promise<boolean> {
  return onboardingRouter.isOnboardingComplete(userId);
}

export function getCurrentOnboardingStep(path: string): OnboardingStep | null {
  return onboardingRouter.getCurrentStep(path);
}