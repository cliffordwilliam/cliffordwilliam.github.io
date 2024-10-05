---
title: "How to Set Up Git and GitHub Using SSH Keys"  
image: "https://cliffordwilliam.sirv.com/Images/github-git.webp?profile=cliffordwilliam"  
description: "Learn how to seamlessly set up Git and GitHub using SSH keys for secure authentication. This guide covers GitHub account setup, generating SSH keys, and verifying your connection."  
categories:  
  - "Technology"  
---

Discover how to set up Git and GitHub using SSH keys for a secure and streamlined workflow. This step-by-step guide covers everything from creating a GitHub account to generating SSH keys, uploading them, and verifying the connection to GitHub.  
<!--more-->  

## Introduction  

This guide focuses on macOS and Linux systems; it does not cover Windows. If you're using a different operating system, please refer to other resources for guidance.

### What Are Git and GitHub?  

Git is a version control system (VCS) that allows you to manage changes to files and coordinate work on those files among multiple people. By entering a directory, you can initialize Git there, allowing you to explicitly tell Git when you want to *save* your work. This *saving* process is akin to saving your progress in a video game. Each time you save your work in Git, it creates a **commit**—which represents a snapshot of your project's state at that moment.

GitHub, on the other hand, is a cloud-based hosting platform for Git repositories. It enables you to store your commits online, much like uploading files to Google Drive. While there are alternatives to GitHub and Git, this post will guide you through the process of setting up Git and GitHub to work together using SSH keys for secure authentication.

### Understanding SSH Keys  

Think of SSH (Secure Shell) keys as a form of digital identity or credential. Just as you need credentials to access your Google Drive, SSH keys provide a more secure way to authenticate with GitHub than entering your username and password. Although you can use the username/password method, I recommend using SSH keys for enhanced security.

## 1. Install Git  

Before getting started, it's a good practice to ensure your system is up to date. Run the following commands:

<pre data-highlights='[{"lines": [2, 3, 4], "color": "#555"}, {"lines": [7], "color": "yellow"}]'><code>function fadeInPage() {
    if (!window.AnimationEvent) return;
    const fader = document.getElementById('fader');
    if (fader) fader.classList.add('fade-out');
}

document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!window.AnimationEvent) return;
    fadeInPage();
    const anchors = document.getElementsByTagName('a');
    for (let idx = 0; idx < anchors.length; idx++) {
        if (
            anchors[idx].hostname !== window.location.hostname ||
            anchors[idx].pathname === window.location.pathname
        ) {
            continue;
        }
        anchors[idx].addEventListener('click', function (event) {
            const fader = document.getElementById('fader');
            if (!fader) return;

            const anchor = event.currentTarget;

            const listener = function () {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };

            fader.addEventListener('animationend', listener);
            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    const fader = document.getElementById('fader');
    if (fader) fader.classList.remove('fade-in');
});</code></pre>
