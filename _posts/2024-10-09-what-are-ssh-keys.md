---
title: "What are SSH Keys"  
image: "https://cliffordwilliam.sirv.com/Images/jen-theodore-CiMITAJtb6I-unsplash.webp"  
description: "Learn how GitHub's SSH key authentication works."  
categories:  
  - "Technology"  
---

Discover how GitHub's SSH key authentication works.

<!--more-->  

## Introduction

In this post, we will explore the inner workings of GitHub's SSH key authentication.

## What is Encryption?

Encryption is the process of scrambling a message so that only authorized parties can read it. There are two primary types of encryption:

- **Symmetric Encryption**
- **Asymmetric Encryption**

## Symmetric Encryption

Consider two people, Alice and Bob. 

When Alice wants to send an encrypted message to Bob, she needs a way to securely share the key required to decrypt it. However, sending the key itself can be insecure.

## Asymmetric Encryption

Asymmetric encryption addresses this problem. 

Here's how it works:

Alice generates two keys: a private key and a public key. Bob does the same.

- The **public key** is used to encrypt messages.
- The **private key** is used to decrypt messages that were encrypted with its corresponding public key. For example, if Bob encrypts a message with his public key, only Bob's private key can decrypt it.

The two keys are mathematically linked, meaning you cannot derive one key from the other. This allows everyone to know how messages are scrambled while keeping the decryption process secret.

### The Flow of Asymmetric Encryption

1. Bob sends his public key to Alice.
2. Alice uses Bob's public key to encrypt the message she wants to send.
3. When Bob receives the message (which was encrypted using his public key), he can decrypt it using his private key.

This way, the private key remains secure, and if Bob's private key is compromised, an unauthorized person could read all messages sent to Bob. However, they would not be able to decrypt messages sent from Alice to Bob, which would require Alice's private key.

Asymmetric encryption is widely used in various applications, including:
- HTTPS web pages
- PGP for secure emails
- Cryptocurrencies like Bitcoin

## SSH Keys

SSH keys are a crucial part of the SSH (Secure Shell) protocol. Protocols are sets of rules that govern how different types of communication occur between machines. For example, HTTP is used for sending hypertext documents, while SSH is used for secure communication over insecure networks.

In the SSH protocol, there are a total of four keys involved. SSH uses **public key cryptography**, also known as asymmetric cryptography, which requires two pairs of keys (four keys in total). These keys are used for communication in both directions: from client to server and from server to client. The four keys are:

- **User Private Key**
- **User Public Key**
- **Host Private Key**
- **Host Public Key**

### User Private Key

This key is kept secret from everyone except the owner of the client. It is generated on the client machine and may be protected with a passphrase, adding an extra layer of security in case someone physically obtains the key.

### User Public Key

This key is the counterpart to the private key and is generated simultaneously. It can be shared with anyone without compromising security. This key is registered on the server and is used to authenticate requests.

### Host Private Key

This key is generated when the SSH server is set up and is only accessible to the server administrator.

### Host Public Key

This is the counterpart to the host private key and is also generated at the same time. It can be safely shared with anyone. Clients verify this key when connecting to ensure they are connecting to the correct server. This verification is typically done only once; subsequent connections do not require rechecking unless the key changes.

## The Flow Diagram

1. The client sends a connection request to the server.
2. The server responds with its supported encryption algorithms.

<pre data-highlights='[{"start": 2, "end": 2, "color": "#445"}]'><code>The authenticity of host 'github.com (20.205.243.166)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.</code></pre>

3. The client sends its public key to the server for authentication (if this is the first connection, the server's public key will be added for future connections).

<pre data-highlights='[{"start": 2, "end": 2, "color": "#445"}]'><code>Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Enter passphrase for key '/home/cliffordw/.ssh/id_ed25519':</code></pre>

4. The server checks if the client's public key is in its list of authorized keys.
5. The server sends a challenge response.
6. The client signs the challenge with its private key (the passphrase is required if set).
7. The server verifies the signature with the corresponding public key in its authorized key list (the server uses the client's public key to decrypt the signed challenge).
8. If verified, the server creates a session key to encrypt the session data.
9. Secure communication begins using the session key.

{% include svg-images/ssh-protocol.svg %}

{% include components/highlightjs-core.html %}
{% include components/highlightjs-bash.html %}  
