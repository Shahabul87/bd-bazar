/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */


export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification",
    "/searchbar",
    "/api/uploadthing",
    "/api/webhook",
    "/portfolio",
    "/blog",
    "/courses",
    "/courses/[courseId]",
    "/about"
    
    
     
  
  ];
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /settings
   * @type {string[]}
   */
  export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
  ];
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  export const apiAuthPrefix: string = "/api/auth";
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
  
  /**
   * An array of routes that are protected
   * These routes require authentication
   * @type {string[]}
   */
  export const protectedRoutes: string[] = [
    "/dashboard/store/products/new",
  ];