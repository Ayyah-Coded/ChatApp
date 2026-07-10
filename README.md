# 1. Project Overview

# BlipChat

> A scalable, event-driven microservices chat platform built with **Node.js**, **TypeScript**, **Express**, **RabbitMQ**, **Redis**, **MongoDB**, and **PostgreSQL**, designed using modern distributed system principles.

BlipChat is a production-oriented backend system that demonstrates how modern messaging platforms can be architected using independently deployable microservices, asynchronous communication, centralized API routing, and shared internal libraries.

Unlike traditional monolithic applications, BlipChat separates business capabilities into autonomous services, allowing each component to evolve, scale, and deploy independently while communicating through secure APIs and event-driven messaging.

The project focuses on real-world backend engineering concepts, including:

- Distributed systems architecture
- Event-driven communication
- Microservices design
- JWT-based authentication
- API Gateway pattern
- Service-to-service communication
- Shared internal packages
- Database isolation
- Redis caching
- Docker-based deployment

Rather than serving as a simple CRUD application, BlipChat demonstrates architectural patterns commonly adopted by engineering teams at companies such as **Netflix, Uber, Spotify, Amazon, and Meta**, making it an excellent showcase of scalable backend engineering practices.

---

## Why BlipChat?

Modern software systems rarely operate as a single application.

As products grow, separating business capabilities into independent services provides significant advantages in scalability, maintainability, and resilience.

BlipChat was built to explore these production-ready architectural principles while demonstrating how distributed systems can be designed using modern backend technologies.

### Core Objectives

- Build a scalable microservices architecture
- Demonstrate asynchronous event-driven communication
- Apply clean service boundaries
- Showcase production-ready backend practices
- Improve maintainability through shared libraries
- Enable independent deployment and scaling

---

# 2. Key Features

BlipChat combines modern backend technologies with production-oriented architectural patterns to deliver a scalable and maintainable messaging platform.

---

## 🚀 Microservices Architecture

The application is divided into independently deployable services, each responsible for a single business capability.

Current services include:

- API Gateway
- Authentication Service
- User Service
- Chat Service
- Shared Common Package

Each service owns its own business logic and can be developed, deployed, and scaled independently.

---

## 🌐 Centralized API Gateway

The API Gateway acts as the single entry point for all client requests.

Responsibilities include:

- Authentication
- Authorization
- Request routing
- Validation
- Error handling
- Logging
- Middleware execution

This simplifies frontend integration while keeping backend services focused solely on business logic.

---

## 📨 Event-Driven Communication

BlipChat leverages RabbitMQ to enable asynchronous communication between services.

Benefits include:

- Loose coupling
- Better fault tolerance
- Independent service evolution
- Background processing
- Reliable message delivery

---

## 🔐 JWT Authentication

Authentication is implemented using stateless JSON Web Tokens (JWT).

Features include:

- User registration
- Secure login
- Protected routes
- Token verification
- Service authentication

---

## ⚡ Redis Integration

Redis is used as a high-performance in-memory data store to improve application responsiveness.

Typical responsibilities include:

- Session caching
- User presence
- Online status
- Frequently accessed data
- Temporary application state

---

## 📦 Shared Internal Package

Reusable functionality is extracted into a shared workspace package.

Shared modules include:

- Authentication utilities
- Validation helpers
- Error handling
- Event definitions
- Shared DTOs
- Logging
- Utility functions

This reduces code duplication while maintaining consistency across services.

---

## 🐳 Dockerized Development

The application is fully containerized using Docker Compose.

Infrastructure includes:

- RabbitMQ
- Redis
- MongoDB
- PostgreSQL
- Backend services

This provides a consistent development environment across all machines.

---

## 🛡️ Type-Safe Development

The project is built entirely with TypeScript, providing:

- Compile-time type checking
- Shared interfaces
- Safer refactoring
- Improved maintainability
- Better developer experience

---

## 📁 Monorepo Architecture

BlipChat uses a pnpm workspace monorepo to organize services and shared packages.

Advantages include:

- Shared dependencies
- Faster installations
- Centralized tooling
- Easier refactoring
- Simplified dependency management

---

# 3. System Architecture

BlipChat follows a distributed microservices architecture where every client request enters through the API Gateway before being routed to the appropriate backend service.

```text
                    ┌───────────────────────────┐
                    │       Client Apps         │
                    │ Web • Mobile • Desktop    │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │        API Gateway        │
                    │ Authentication            │
                    │ Authorization             │
                    │ Validation                │
                    │ Routing                   │
                    └─────────────┬─────────────┘
                 ┌────────────────┼────────────────┐
                 ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │ Auth Service │ │ User Service │ │ Chat Service │
        └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
               │                │                │
               └──────────┬─────┴─────┬──────────┘
                          ▼           ▼
                 ┌─────────────┐ ┌──────────────┐
                 │  RabbitMQ   │ │    Redis     │
                 └─────────────┘ └──────────────┘
                          │
                          ▼
                 Event-Driven Messaging

        Each service owns and manages its own database.
```

---

## Architectural Principles

### Domain Isolation

Every microservice owns its own business logic, persistence layer, and internal implementation.

This minimizes coupling while allowing services to evolve independently.

---

### API Gateway Pattern

Clients communicate exclusively with the API Gateway.

```text
Client

   │

   ▼

API Gateway

   │

   ▼

Backend Services
```

Benefits include:

- Single public endpoint
- Centralized authentication
- Simplified frontend integration
- Unified error handling
- Improved security

---

### Event-Driven Design

Instead of relying solely on synchronous HTTP communication, services publish domain events through RabbitMQ.

```text
User Registers

      │

      ▼

Authentication Service

      │

Publishes Event

      ▼

RabbitMQ

      │

      ▼

Interested Services
```

This architecture enables services to react independently without creating direct dependencies.

---

### Shared Internal Library

Cross-cutting concerns are centralized inside a reusable internal package.

Shared functionality includes:

- Authentication middleware
- Event contracts
- Validation
- Error handling
- Logging
- Utility functions

This promotes consistency across every microservice.

---

# 4. Technology Stack

## Core Technologies

| Category | Technology |
|-----------|------------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Architecture | Microservices |
| Package Manager | pnpm Workspaces |
| API | REST |
| Authentication | JWT |
| Messaging | RabbitMQ |
| Cache | Redis |
| Databases | MongoDB & PostgreSQL |
| Containerization | Docker |
| Orchestration | Docker Compose |

---

## Backend

BlipChat is built using **Node.js**, **Express**, and **TypeScript**, providing a highly concurrent runtime with strong type safety and an excellent developer experience.

---

## Messaging

RabbitMQ powers asynchronous communication between services.

Typical use cases include:

- Domain events
- Background jobs
- Service notifications
- Workflow orchestration

---

## Caching

Redis provides an in-memory cache for frequently accessed or temporary data.

Examples include:

- User presence
- Session storage
- Cached queries
- Temporary application state

---

## Databases

BlipChat demonstrates a **polyglot persistence** approach by allowing services to choose the database technology best suited to their domain.

Benefits include:

- Better performance
- Technology flexibility
- Service independence
- Optimized data models

---

## Infrastructure

Docker Compose orchestrates the complete development environment by coordinating containers, networking, and persistent storage.

---

## Developer Tooling

The project also leverages modern development tooling to improve maintainability and consistency.

- TypeScript
- pnpm Workspaces
- Docker
- ESLint
- Shared configuration packages

---

# 5. Architecture Decisions

BlipChat was intentionally designed using production-oriented architectural patterns rather than traditional monolithic design.

Every major technology choice supports scalability, maintainability, and long-term system evolution.

---

## Why Microservices?

Instead of placing every feature inside a single application, BlipChat separates responsibilities into independently deployable services.

### Benefits

- Independent deployments
- Smaller codebases
- Fault isolation
- Easier testing
- Better scalability
- Improved maintainability

Each service focuses on a single business domain.

---

## Why an API Gateway?

The API Gateway provides a unified entry point for all client applications.

Its responsibilities include:

- Authentication
- Authorization
- Request validation
- Routing
- Middleware execution
- Error handling
- Logging

This keeps backend services lightweight while simplifying frontend integration.

---

## Why RabbitMQ?

Asynchronous messaging enables services to communicate without directly depending on one another.

### Advantages

- Loose coupling
- Reliable message delivery
- Retry support
- Background processing
- Independent service evolution
- Improved resilience

This architecture is better suited for distributed systems than relying exclusively on synchronous HTTP requests.

---

## Why Redis?

Memory operations are significantly faster than database queries.

Redis improves overall system responsiveness by storing frequently accessed or short-lived data.

Potential use cases include:

- Session management
- Presence tracking
- Online users
- Cached responses
- Rate limiting

---

## Why a Shared Common Package?

Many backend concerns are common across services.

Instead of duplicating this logic, BlipChat centralizes reusable components into a shared internal package.

Examples include:

- Authentication middleware
- Validation schemas
- Event contracts
- Shared DTOs
- Error handling
- Logging utilities
- Helper functions

This ensures consistency while reducing maintenance costs.

---

## Why Database per Service?

Each microservice owns and manages its own database.

This architectural pattern provides:

- Better isolation
- Independent schema evolution
- Stronger service boundaries
- Improved scalability
- Technology flexibility

No service directly accesses another service's database.

---

## Engineering Philosophy

BlipChat embraces modern distributed system principles, emphasizing modularity, scalability, and resilience. By combining microservices, asynchronous messaging, shared libraries, and independent data ownership, the platform demonstrates backend engineering practices that extend far beyond traditional CRUD application development.
