import { useEffect } from 'react';

export const useCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    
    cursor.className = 'cursor';
    follower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX - 10 + 'px';
      cursor.style.top = mouseY - 10 + 'px';
    };

    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      follower.style.left = followerX - 20 + 'px';
      follower.style.top = followerY - 20 + 'px';
      
      requestAnimationFrame(updateFollower);
    };

    const handleMouseEnter = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-hover');
    };

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updateCursor);
    updateFollower();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.body.removeChild(cursor);
      document.body.removeChild(follower);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
};