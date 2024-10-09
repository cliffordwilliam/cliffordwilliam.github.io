---
title: "How to Set Up Git and GitHub Using SSH Keys"  
image: "https://cliffordwilliam.sirv.com/Images/github-git.webp?profile=cliffordwilliam"  
description: "Learn how to install Git, create an account on GitHub, and generate an SSH key for authentication."  
categories:  
  - "Technology"  
---

Discover how to install Git, create a GitHub account, and generate an SSH key for authentication in this step-by-step guide.
<!--more-->  

## Introduction

In this guide, we focus on Unix-based systems, such as macOS and Linux, which use BASH. We will be using the Ed25519 algorithm for generating SSH keys.

### What is Git?

There are many version control systems (VCS), but Git is the most popular. A VCS is designed to keep track of changes in a directory's content history.

Here’s a brief overview of how Git works: you start in the directory you want Git to monitor. From there, you initialize Git. As you work, you can instruct Git to take a snapshot, also known as a **commit**, of the directory's current state, which files and directories are in it, and what their content looks like. At any time, you can revert to any commit, similar to using undo <kbd>Ctrl</kbd> + <kbd>Z</kbd> or redo <kbd>Ctrl</kbd> + <kbd>Y</kbd>. This allows you to cycle through your commit history timeline, known as a **branch**. You can create multiple branches, but we will cover that in another post. All branches are stored in a directory called **repository**, located in the root directory where you initialized Git.

Git can be applied to various domains beyond programming—consider any project where you need to track changes in text-based content (excluding rich text). It’s a versatile tool.

### What is GitHub?

GitHub is a service similar to Google Drive. The key difference is that while Google Drive can upload, host, manage, and store any type of file, GitHub specifically focuses on repositories, primarily Git repositories. Although other platforms are available besides GitHub, it is the most widely used.

Storing your repository on GitHub has several advantages: it provides online backup (GitHub is unlikely to shut down anytime soon, and many critical software projects are hosted there), facilitates collaboration (allowing multiple users to work on a single repository), and offers exposure by allowing your repository to be set to public, making it accessible on the internet.

It's important to note that GitHub and Git are not the same; they are developed by different companies and serve different purposes.

### Understanding SSH Keys

Similar to Google Drive, GitHub uses usernames and passwords for authentication. However, I recommend using SSH keys for GitHub authentication because they are more secure. When you want to upload your repository to GitHub, you will use your SSH key as your credential.

An SSH key is a cryptographically secure identifier, functioning as a long password for machine identification.

You create one SSH key for each machine. If you have multiple machines with their own keys, GitHub allows you to register multiple keys with your GitHub account. This way, whenever you use a machine to upload to your account, GitHub checks if that machine's key exists in its list of registered keys for validation. This process is known as creating an SSH key pair. When you create a key for a machine and register it with GitHub, your machine has one key, and GitHub retains an identical copy of that key, forming a key pair.

### Overview

Here’s an overview of what we will be doing:

1. Update your operating system to the latest version.
2. Install the latest version of Git.
3. Register a GitHub account (make sure to note your credentials).
4. Configure Git with your GitHub account's credentials.
5. Create an SSH key for this machine.
6. Register the SSH key with GitHub.

Once you complete these steps, your machine will be able to use Git to upload repositories to GitHub using SSH key authentication.

## 1. Update Your System

Before getting started, ensure your system is up to date. Run the following commands:

<blockquote>
<p>In Unix-like systems, when using certain commands like <code>sudo</code>, you are required to enter your password for authentication. When typing a password, the characters will not be displayed as you type. This might give the impression that the terminal is unresponsive, but it is functioning normally. Just type as normal and press <kbd>Enter</kbd> to submit. This is designed for security, similar to how websites show asterisks instead of the actual characters when you input passwords.</p>
</blockquote>

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>sudo apt update
sudo apt upgrade</code></pre>

## 2. Install Git

Run the following commands to install the latest version of Git:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git</code></pre>

## 3. Check Git Version

If the output shows that the version is less than 2.28, please go back to [step 1](#1-update-your-system) and repeat the process.

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>git --version</code></pre>

## 4. Create a GitHub Account

Go to [GitHub.com](https://github.com/) and register for an account. You must use your real credentials and remember them. You will need these for Git configuration in the next step.

Note that the email you use for registration will become part of your commit metadata, which will be publicly visible for public repositories. If you prefer not to expose your real email in public repositories, you can use GitHub's private email feature. To enable this, log in to GitHub and go to [Email Settings](https://github.com/settings/emails). Make sure to check:

- Keep my email addresses private
- Block command line pushes that expose my email

With these options checked, your real email will not appear in commit metadata. Remember the **special private email that GitHub provided** under the "Keep my email addresses private" section; we will use it in the next step to configure Git so that commit metadata uses this email instead of your real email.

## 5. Configure Git with GitHub Credentials

Since we are using Git to upload to GitHub, you should configure Git with your GitHub credentials. You will also set your commit email here with either your real or **special private email that GitHub provided**. The email and name here will be used as your commit metadata. You will see an example command below that includes my name and email: 'Clifford William' and 'ccliffordwilliam@gmail.com'. Please replace these with your own credentials, ensuring you include the double quotation marks like this: "John Doe":

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>git config --global user.name "Clifford William"
git config --global user.email "ccliffordwilliam@gmail.com"</code></pre>

If you prefer to use your private email for commit metadata, please set the email using the private email provided by GitHub from [step 4](#4-create-a-github-account), and replace 'Clifford William' with your name:

<pre data-highlights='[{"start": 2, "end": 2, "color": "#445"}]'><code>git config --global user.name "Clifford William"
git config --global user.email "123456789+your-private-email-here@users.noreply.github.com"</code></pre>

Before moving on, it’s a good idea to verify that Git recognizes your configuration correctly. If the output is not what you entered, repeat [step 5](#5-configure-git-with-github-credentials) again:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>git config --get user.name
git config --get user.email</code></pre>

## 6. Configure Git to Ignore .DS_Store  

If you are using macOS, you should instruct Git to ignore `.DS_Store` files, as these files are created by macOS for directory metadata when using Finder. The `.DS_Store` file holds macOS directory metadata, such as thumbnails, and is usually invisible in the user interface. Run the following commands:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>echo .DS_Store >> ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global</code></pre>

## 7. Configure Git with GitHub Settings  

Since GitHub has changed its default branch name from 'master' to 'main' to promote more inclusive language, you should configure your local Git settings accordingly. This configuration will apply to all future repositories you initialize on your machine:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>git config --global init.defaultBranch main</code></pre>

## 8. Recommended Git Settings  

This step is optional, but I recommend these settings for better readability in your Git output. The following command will enable colorful output with Git:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>git config --global color.ui auto</code></pre>

I also suggest setting the default branch reconciliation to merge. When pulling updates into your local repository, using the merge strategy can enhance clarity by explicitly recording merge actions. More on this will be covered in another post:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>git config --global pull.rebase false</code></pre>

## 9. Create SSH Key for This Machine  

First, check if you already have an SSH key file by running the following command:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>ls ~/.ssh/id_ed25519.pub</code></pre>

If the output says "No such file or directory," then you do not have an SSH key. Let’s create one. 

The following command will prompt you for the save location; just press <kbd>Enter</kbd> to accept the default. You will also be prompted to enter a passphrase for added security. You can choose to enter one or press <kbd>Enter</kbd> to leave it blank:

If you set a passphrase, you will need to enter it every time you upload to GitHub or check the SSH key pair connection in the later step.

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>ssh-keygen -t ed25519</code></pre>

Great! Your machine now has an SSH key.

## 10. Register or Link the SSH Key with GitHub  

Follow these steps to register your SSH key (note that this is the front-end layout of GitHub at the time of writing, so it may change in the future):

1. Log in to GitHub.
2. Click your profile picture in the top right corner.
3. Select `Settings` from the dropdown menu.
4. In the left sidebar, click `SSH and GPG keys`.
5. In the top right corner, click `New SSH Key`.

In the key type section, select `Authentication Key` (the exact wording may vary) and name your key appropriately in kebab case, like `ubuntu-linux`, so that at a glance you know which machine owns this key. You can view your SSH key using the following command to display its contents:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>cat ~/.ssh/id_ed25519.pub</code></pre>

Just to confirm, the output should start with `ssh-ed25519` and end with `username@hostname`. If that is not the case, please redo from [step 9](#9-create-ssh-key-for-this-machine).

Copy the output and paste it into the "Key" field on GitHub. Finally, click `Add SSH Key`.

Great, you just created a new SSH key pair in this account.

## 11. Testing Your SSH Key Connection  

To confirm that your SSH key is working, we need to check the key fingerprint. Do not type `yes` and press <kbd>Enter</kbd> just yet after running the following command; run it just to see the key fingerprint in the output:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>ssh -T git@github.com</code></pre>

After running the command, you will see the key fingerprint in the output. For example, the highlighted line may look like this:

<pre data-highlights='[{"start": 2, "end": 2, "color": "#445"}]'><code>> The authenticity of host 'github.com (IP ADDRESS)' can't be established.
> ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
> Are you sure you want to continue connecting (yes/no)?</code></pre>

Then, check if your key fingerprint exists in [GitHub's public fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints).

If it does, type `yes` in the terminal and press <kbd>Enter</kbd>.

If successful, you should see a message like this:

<pre data-highlights='[{"start": 0, "end": 0, "color": "#445"}]'><code>Hi [username]! You've successfully authenticated, but GitHub does not provide shell access.</code></pre>

That means you have successfully created an SSH key pair.

If you encounter an error, redo from [step 9](#9-create-ssh-key-for-this-machine).

## Conclusion  

Congratulations! You’ve successfully set up Git and GitHub using SSH keys for secure authentication. You are now ready to use Git to manage your projects and collaborate on GitHub with confidence.

{% include components/highlightjs-core.html %}
{% include components/highlightjs-bash.html %}
