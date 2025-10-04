 async function tweetIntent(cheer: string) {
    const encoded = encodeURIComponent(cheer);

    // detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      try {
        // Create a promise to handle the deep link attempt
        await new Promise<void>((resolve, reject) => {
          // Store the current page visibility state
          const originalVisibility = document.visibilityState;
          
          // Set up visibility change listener to detect app switch
          const visibilityHandler = () => {
            if (document.visibilityState === 'hidden') {
              // App was opened successfully
              document.removeEventListener('visibilitychange', visibilityHandler);
              resolve();
            }
          };
          
          // Listen for visibility changes
          document.addEventListener('visibilitychange', visibilityHandler);
          
          // Try the deep link
          window.location.href = `twitter://post?message=${encoded}`;
          
          // Set a reasonable timeout for the deep link attempt
          setTimeout(() => {
            document.removeEventListener('visibilitychange', visibilityHandler);
            // If visibility didn't change, the app wasn't opened
            if (document.visibilityState === originalVisibility) {
              reject(new Error('Twitter app not available'));
            } else {
              resolve();
            }
          }, 1000);
        });
      } catch (error) {
        // Fallback to web if deep link fails
        window.open(`https://x.com/intent/post?text=${encoded}`, "_blank");
      }
    } else {
      // desktop - directly open web intent
      window.open(`https://x.com/intent/post?text=${encoded}`, "_blank");
    }
  }