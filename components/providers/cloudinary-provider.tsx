"use client";

import { FC, ReactNode, useEffect } from 'react';

interface CloudinaryProviderProps {
  children: ReactNode;
}

export const CloudinaryProvider: FC<CloudinaryProviderProps> = ({ children }) => {
  useEffect(() => {
    // Check if the Cloudinary script is already loaded
    if (!document.getElementById('cloudinary-widget-script')) {
      const script = document.createElement('script');
      script.id = 'cloudinary-widget-script';
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        if (document.getElementById('cloudinary-widget-script')) {
          document.getElementById('cloudinary-widget-script')?.remove();
        }
      };
    }
  }, []);

  return <>{children}</>;
}; 