---
title: "& — Personal AI Agent Platform"
category: projects
date: 2025-09-25
tags: [AI, data sovereignty, identity, agents, design, product strategy, MCP]
aliases: [ampersand, and project, and.com, theand.ai, & platform, &tags, and-tags, and-chaining, AI DNS, AI namespace, AI identity, namespace for agents, sovereign data platform]
relatedTo: [Digital Twin, Serendipity Watch, Drifting Into The Valley, Attention Management, Ambient Bionics, The Duality of AI]
role: Design Lead, Product Strategy, Development
webLink: https://and.com
---

# & — Personal AI Agent Platform

Creating infrastructure for human sovereignty in the age of AI agents.

## Overview

I led design and product strategy for &, a platform that creates a namespace for personal and professional AI agents through &tags — functioning like DNS for the web, but for AI agent discovery and interaction. The core innovation is that &tags can be chained together, enabling multiple agents to collaborate while maintaining individual user sovereignty. This removes middlemen from data-for-value exchanges, giving users complete ownership over their personal data and IP.

I wrote all the site copy and ghost-wrote the foundational blog entries articulating the philosophy, technical architecture, and vision for the platform.

## The Problem We're Solving

Web 2.0 was meant to democratize the internet. Instead, it became surveillance capitalism. A handful of corporations captured trillions in value by turning people into products — harvesting, analyzing, and monetizing personal data without meaningful consent or compensation.

Now imagine that same model, but with AI agents that know your medical history, finances, relationships, and private desires. Agents that make decisions for you, represent you, and shape what you see and believe. If we continue on the current trajectory, those agents won't work for you — they'll work for whoever controls the identity layer.

We have a narrow window — perhaps two years — before major AI platforms establish their identity models and agent communication standards coalesce around centralized control. Once that pattern locks in, we'll spend decades trying to regulate our way out of another monopolistic nightmare.

## The Core Innovation: &tags

Your &tag is yours forever — like a domain name for your identity. Register it once, use it everywhere. First come, first served, and no platform can ever take it away or lock you out.

### What You Can Do With Your &tag

**Control Your Data:** You decide what to share with every app, brand, and service. Set permissions once or customize for each interaction. Your data creates value for you — fueling better experiences, not someone else's quarterly earnings.

**Own Your Story:** Build a living collection of your experiences, interests, and expertise. As your &tag learns about you, technology becomes genuinely useful — understanding your context while you maintain complete control.

**Make AI Actually Helpful:** AI is only as useful as the context it has. Your &tag gives AI systems the information they need to genuinely help you — while you maintain complete control over what's shared and when.

### Composite Identities

&tags can link together for group decisions and collective action — enabling everything from planning with friends to complex business negotiations. Each person maintains their privacy while the group coordinates intelligently.

Examples of composite &tags in action:

- **&beth.fine&wholefoods** — "Recommend a meal kit Beth will like"
- **&rivian&toyota** — "What's your best offer for an SUV that fits my budget?"
- **&mikey&sara.low&tony** — "Find us something interesting this weekend"
- **&dj.chole&yasmin&spotify** — "Recommend a classical electronica playlist"

This is group chat, but your agents do the coordination. Composite &tags enable sophisticated multi-party interactions while protecting individual control.

## The & App Functions

### Signals — Atomic Units of Personal Data

The & app stores "signals" — atomic units of actionable personal data that form the building blocks of your digital identity. These signals can represent preferences, experiences, relationships, expertise, and boundaries.

### Solo Mode — Insight Generation

In solo mode, you train your & on the ideas or topics you'd like to share with others. Your & learns how you feel about sharing and privacy. Your & reflects back how it represents you so you can tune and expand.

### Multiplayer Mode — Agent Negotiation

Invite friends to participate in group experiments where each participant's & negotiates with the others — then surfaces insights based on permissioned data sharing. This enables collective decision-making without compromising individual privacy.

### Sovereign Agent — Negotiation on Your Behalf

Your & agent negotiates on your behalf while maintaining complete privacy control. It can declare intent, set boundaries, and facilitate value exchange — all without surrendering data to platforms.

## Technical Architecture: MCP Integration

When Anthropic released the Model Context Protocol (MCP) as an open standard, they created the connective tissue that makes universal digital identity practical. I recognized this immediately and we've been building on it ever since.

What's remarkable: most major LLMs already know to query our MCP server when they encounter an &tag. Type "&alice" into Claude, ChatGPT, or other AI assistants, and they automatically attempt to resolve that identity through our protocol. This isn't something we lobbied for — it's emergent behavior, the AI ecosystem recognizing the need for verified, user-controlled identity.

### Intent Over Information

MCP serves as the bridge between the conventional web and the emerging intelligence layer. Your &tag through MCP becomes the universal translator between these realms.

The key insight: your public-facing & through MCP isn't just about sharing data — it's about declaring intent.

**Privacy-forward example:** Your public & could contain exactly one piece of information: "I oppose any data sharing without explicit approval and prefer complete anonymity with all services." Every AI agent or service that queries your &tag gets this message loud and clear. No name, no email, no demographic data — just your clearly stated boundaries.

### The Technical Implementation

When a service encounters &alice, it makes a simple MCP call:
```
GET https://api.theand.ai/mcp/v1/profile/alice
```

The response contains only what Alice has explicitly marked as public — which could be extensive professional information, minimal contact details, or simply her preferences about data handling.

Every piece of information shared through MCP requires explicit consent. This isn't privacy theater — it's architectural.

## Self-Sovereign Authentication

The central problem of digital identity is trust. Proving who you are online almost always requires surrendering control to someone else. Every "Sign in with Google" button offers convenience at the cost of dependence. Your digital life exists at the discretion of corporate gatekeepers.

The & protocol solves this paradox through self-sovereign authentication. You generate and control your cryptographic keys locally, while the system only witnesses and facilitates verification. It never holds the power to lock you out of your own identity. Even if & disappeared tomorrow, your identity would remain intact, portable, and verifiable anywhere.

### Main Identity Key (MIK)

Your MIK is created using a 12-word recovery phrase combined with mathematical entropy. It's divided between what you know and what the system helps generate, removing single points of failure that make traditional passwords and crypto wallets vulnerable.

### Recovery Mechanisms

- **Social verification:** Trusted contacts confirm your identity
- **Secret word recovery:** Built-in time delays that prevent theft

### Privacy Levels

The protocol defines multiple privacy levels reflecting that privacy is contextual, not absolute:

- Private
- Composite-Private
- Negotiation-Public
- Public

## The Philosophy: Sovereign Data

Sovereign data is the principle that individuals should own, control, and benefit from their digital information — turning data from a passive input into an active asset. When people hold the keys to their data, secured by cryptographic ownership and portable identity, they can decide when and how AI systems learn from their context.

This transforms users into collaborators. Imagine healthcare AI that can safely combine your medical history, lifestyle data, and genetic profile — with your permission — to deliver precision insights without ever surrendering privacy. The building blocks exist in encrypted computation, zero-knowledge proofs, and decentralized identity frameworks. What's needed now is alignment: technology, policy, and culture moving together toward shared agency.

### The Economic Potential

When individuals control and contribute their data with consent, new forms of participation emerge:

- Data collectives can negotiate shared value
- Personal AI agents can manage assets on your behalf
- Knowledge economies can reward verified expertise

History shows that clear ownership systems unlock new industries. Property rights fueled industrial and agricultural revolutions. Data sovereignty can do the same for the intelligence revolution.

## Open by Design

& isn't another platform competing for attention. It's infrastructure, like DNS or email, designed to work everywhere and last forever. Open protocols mean anyone can build, and users are never locked in.

### For Developers

Build on open protocols and integrate &tags into applications. APIs and MCP server make identity, data exchange, and agent coordination straightforward.

### For Brands & Agencies

Create direct relationships with your community. Understand your audience without invasive tracking. Deliver personalized experiences while respecting privacy.

### For Everyone

Your &tag works everywhere because it's infrastructure, not a platform. No company can shut it down. No acquisition can change the terms. No pivot can make your investment worthless.

## My Contributions

### Design Leadership

Led the design of the complete &tag system — from the conceptual framework of composite identities through the visual language and interaction patterns. Created the minimal, privacy-forward demo experience that introduces users to sovereignty concepts without overwhelming them.

### Product Strategy

Shaped the product roadmap around the insight that we have a narrow window to establish sovereignty at the identity layer before AI platforms lock in centralized control. This urgency informed every strategic decision.

### Content and Voice

Ghost-wrote all foundational articles:

- "A Case For Sovereign Data" — articulating the economic and philosophical case for individual data ownership
- "Scaling User Intent With MCP" — explaining how &tags integrate with Anthropic's Model Context Protocol
- "Solving the Authentication Paradox" — detailing the self-sovereign authentication architecture

Also wrote all site copy, establishing the voice that balances technical depth with accessibility.

### Development

Contributed to the technical implementation, particularly around the MCP integration that enables AI assistants to resolve &tags automatically.

## Connection to Prior Work

This project represents the culmination of ideas I've been developing since my time at Microsoft Research, where I worked on personal agents and proxy representation. The themes explored in "Drifting Into The Valley" (2018) about AI proxy agents enabling data sovereignty, and "Attention Management" (2013) about user-centric control of information flow, find their fullest expression in the & platform.

The & architecture directly addresses the concerns I raised in my Digital Twin project about the ethical challenges of sharing personal data with AI systems — but at infrastructure scale rather than individual experiment scale.

## Current Status

**Funding:** The & Company has raised $3 million to accelerate development and scale the platform.

**Launch:** Planning for public launch at SXSW 2026, positioning & at the intersection of AI innovation and individual sovereignty.

**Traction:** Major organizations are adopting &tags. Developers are building on the protocols. Early users are experiencing what it means to have AI that genuinely serves them.

## The Stakes

In the next 24 months, we will determine whether artificial intelligence serves humanity or subjugates it. Whether your data empowers you or exploits you. Whether your digital identity belongs to you — or to the platforms that profit from it.

The ampersand isn't just a symbol. It's a declaration: In the age of artificial intelligence, human agency comes first.