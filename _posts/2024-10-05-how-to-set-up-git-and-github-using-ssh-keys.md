---
title: "How to Set Up Git and GitHub Using SSH Keys"  
image: "https://cliffordwilliam.sirv.com/Images/github-git.webp?profile=cliffordwilliam"  
description: "Learn how to seamlessly set up Git and GitHub using SSH keys for secure authentication. This guide covers GitHub account setup, generating SSH keys, and verifying your connection."  
categories:  
  - "Technology"  
---

Discover how to set up Git and GitHub using SSH keys for a secure and streamlined workflow. This step-by-step guide covers everything from creating a GitHub account to generating SSH keys, uploading them, and verifying your connection to GitHub.  
<!--more-->  

## Introduction  

This guide focuses on Unix-based systems, such as macOS and Linux; it does not cover Windows. If you're using a different operating system, please refer to other resources for guidance.

We will be using the Ed25519 algorithm for generating SSH keys.

### What is Git?  

There are many version control system (VCS) software options, but Git is the most popular. A VCS is designed to keep track of changes in a folder's content history. This concept is similar to how you can use <kbd>Ctrl</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd> + <kbd>Y</kbd> in a text editor to cycle through the history of changes.

Here’s a brief overview of how Git works: you start in a directory that you want Git to monitor. From there, you initialize Git. As you work, you can instruct Git to take a snapshot of the directory's current state; this is called a **commit**. At any time, you can revert to any commit, similar to using <kbd>Ctrl</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd> + <kbd>Y</kbd>. All commits are collected in a timeline known as a **branch**. You can create multiple branches from any commit, akin to alternate timelines or versions. This branch feature allows you to manage different versions of your work within a single directory instead of saving multiple versions of the same file in different locations. You can also merge branches, eliminating the hassle of manually copying and pasting changes. All branches are stored in a directory called **repository** located in the root directory where you initialized Git.

Git can be applied to various domains, not just programming—think of books, art, or any project where you need to track changes. It’s a versatile tool.

### What is GitHub?  

Now that you know Git stores history in a directory called a repository, GitHub is a service similar to Google Drive. The key difference is that Google Drive can upload, host, manage and store any type of file, whereas GitHub specifically works with repositories. While there are other platforms available besides GitHub, it is the most widely used.

Storing your repository on GitHub has several advantages: it provides backup, facilitates collaboration (allowing multiple users to work on a single repository), and offers exposure since your repository can be set to public, making it accessible on the internet.

Take note that GitHub and Git are not the same, they are made by different companies for different purposes.

### Understanding SSH Keys  

Just like Google Drive uses usernames and passwords for authentication, GitHub does as well. However, I recommend using SSH keys for GitHub authentication because they are more secure. When you want to upload your repository to GitHub, you will use your SSH key as your credential.

SSH Key is a cryptographically secure identifier, it is a long password for a machine identification.

You should generate one SSH key per machine. Each machine can create its SSH key, and once generated, you must register it with your GitHub account so that GitHub recognizes that machine. This way, whenever you use that machine to upload, GitHub can confirm your identity via the registered SSH key.

### Overview  

Here’s an overview of what we will be doing:

1. Update your operating system.
2. Install the latest version of Git.
3. Register a GitHub account (remember your credentials).
4. Configure Git with the credentials used for your GitHub account.
5. Create an SSH key for this machine.
6. Register the SSH key with GitHub.

Once you complete these steps correctly, your machine will be able to use Git to upload repositories to GitHub using SSH key authentication.

## 1. Update Your System  

Before getting started, it's good practice to ensure your system is up to date. Run the following commands:

<blockquote>
<p>In Unix-like systems, when using certain commands like `sudo` you are required to type your password for authentication. When typing a password, the characters will not be displayed for security reasons. Just type as normal and press <kbd>Enter</kbd> once you've entered the correct password. This is designed like this for security reasons, like how website shows asterisks instead of the characters when you input passwords too.</p>
</blockquote>

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>sudo apt update
sudo apt upgrade</code></pre>

## 2. Install Git  

Run the following commands to install the latest version of Git:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git</code></pre>

## 3. Check Git Version  

If the version is less than 2.28, repeat [step 1](#1-update-your-system).

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>git --version</code></pre>

## 4. Register Your GitHub Account  

Go to [GitHub.com](https://github.com/) and register for an account. Use your real credentials and remember them, as you will need to use these for Git configuration in the next step. 

Note that the email you use for registration will become part of your commit metadata. If you prefer not to expose your real email in public repositories, you can use GitHub's private email feature. To enable this, log in to GitHub and go to [Email Settings](https://github.com/settings/emails). Make sure to check:

- Keep my email addresses private
- Block command line pushes that expose my email

With these options checked, your real email will not appear in commit metadata. Remember the private email GitHub provides under the "Keep my email addresses private" section; we will use it in the Git configuration.

## 5. Configure Git with GitHub Credentials  

Since we are using Git to upload to GitHub, it makes sense to configure Git with your GitHub credentials. You will also set your commit email here. The following command contains my name and email; please edit it with your own credentials before running the command to configure Git:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>git config --global user.name "Clifford William"
git config --global user.email "ccliffordwilliam@gmail.com"</code></pre>

If you prefer to use your private email, please set the email using the private email from the previous step:

<pre data-highlights='[{"start": 2, "end": 2, "color": "#334"}]'><code>git config --global user.name "Clifford William"
git config --global user.email "123456789+your-private-email-here@users.noreply.github.com"</code></pre>

Before moving on, it’s a good idea to verify that Git recognizes your configuration. If the output is not as expected, repeat this step:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>git config --get user.name
git config --get user.email</code></pre>

## 6. Configure Git to Ignore .DS_Store  

If you are using macOS, you will want to instruct Git to ignore `.DS_Store` files, which are created for macOS directory metadata when you use Finder to look into a directory. Run the following commands:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>echo .DS_Store >> ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global</code></pre>

## 7. Configure Git with GitHub Settings  

Since GitHub has changed its default branch name from "master" to "main," you should configure your local Git settings accordingly:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>git config --global init.defaultBranch main</code></pre>

## 8. Recommended Git Settings  

This step is optional, but I recommend these settings for better readability in your Git output. Running the following command will enable syntax highlighting for keywords:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>git config --global color.ui auto</code></pre>

I also suggest setting the default behavior for pulling changes from GitHub. When working online and then pulling updates into your local repository, you might want to use the merge strategy for clarity. This will create a new commit to mark the merge action:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>git config --global pull.rebase false</code></pre>

## 9. Create SSH Key for This Machine

Now we will create an SSH key for this machine and register it with GitHub. This is called, setting an SSH Key pair with GitHub, since your machine and GitHub has their own keys we call it pairs.

First, check if you already have an SSH key:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>ls ~/.ssh/id_ed25519.pub</code></pre>

If the output says "No such file or directory," then you do not have an SSH key. Let’s create one. 

The following command will prompt you for the save location; just press <kbd>Enter</kbd> to accept the default. You will also be prompted to enter a passphrase for added security. You can choose to enter one or press <kbd>Enter</kbd> to leave it blank:

Note that if you do set a passphrase, you need to input it everytime you want to upload to GitHub.

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>ssh-keygen -t ed25519</code></pre>

Great! Your machine now has an SSH key.

## 10. Register or Link the SSH Key with GitHub  

Follow these steps to register your SSH key:

1. Log in to GitHub.
2. Click your profile picture in the top right corner.
3. Select `Settings` from the dropdown menu.
4. In the left sidebar, click `SSH and GPG keys`.
5. In the top right corner, click `New SSH Key`.

Select the key type as `Authentication Key` and name your key appropriately in camel case like `ubuntu-linux` so that at a glance you know which machine of yours own this key. You can view your SSH key using the following command:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>cat ~/.ssh/id_ed25519.pub</code></pre>

Just to confirm, but the output should start with `ssh-ed25519` and ends with `username@hostname`. If that is not the case then please redo from [step 9](#9-create-ssh-key-for-this-machine).

Copy the output and paste it into the "Key" field on GitHub. Finally, click `Add SSH Key`.

## 11. Verify Your SSH Connection  

To confirm that your SSH key is working, we need to check what the Key fingerprint is. Do not type yes and hit <kbd>Enter</kbd> just yet after running the following command, run that command just to see the key fingerprint that is in the output:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>ssh -T git@github.com</code></pre>

Then we check if your key fingerprint exists in [GitHub's public fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints).

If it is then type yes and hit <kbd>Enter</kbd>.

If successful, you should see a message like this:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#334"}]'><code>Hi [username]! You've successfully authenticated, but GitHub does not provide shell access.</code></pre>

If you encounter an error, redo from [step 9](#9-create-ssh-key-for-this-machine).

## Conclusion  

Congratulations! You’ve successfully set up Git and GitHub using SSH keys for secure authentication. Now you can start using Git to manage your projects and collaborate on GitHub with confidence.
