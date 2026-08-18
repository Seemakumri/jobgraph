// ===============================
// COMPANIES
// ===============================

CREATE
(:Company {
    id: 'COMP001',
    name: 'Wexa AI',
    location: 'Gurugram'
}),
(:Company {
    id: 'COMP002',
    name: 'TechNova Solutions',
    location: 'Noida'
}),
(:Company {
    id: 'COMP003',
    name: 'CloudWorks',
    location: 'Bengaluru'
});

// ===============================
// SKILLS
// ===============================

CREATE
(:Skill {name: 'Java'}),
(:Skill {name: 'Spring Boot'}),
(:Skill {name: 'React'}),
(:Skill {name: 'JavaScript'}),
(:Skill {name: 'TypeScript'}),
(:Skill {name: 'PostgreSQL'}),
(:Skill {name: 'Docker'}),
(:Skill {name: 'AWS'}),
(:Skill {name: 'GraphQL'}),
(:Skill {name: 'Microservices'});

// ===============================
// CANDIDATES
// ===============================

CREATE
(:Candidate {
    id: 'C001',
    name: 'Seema Sharma',
    experience: 2
}),
(:Candidate {
    id: 'C002',
    name: 'Rahul Kumar',
    experience: 3
}),
(:Candidate {
    id: 'C003',
    name: 'Priya Singh',
    experience: 2
}),
(:Candidate {
    id: 'C004',
    name: 'Amit Verma',
    experience: 4
});

// ===============================
// PROJECTS
// ===============================

CREATE
(:Project {
    id: 'P001',
    name: 'Food Ordering Platform'
}),
(:Project {
    id: 'P002',
    name: 'E-Commerce Platform'
}),
(:Project {
    id: 'P003',
    name: 'AI Recruitment Platform'
}),
(:Project {
    id: 'P004',
    name: 'Banking Application'
});

// ===============================
// JOBS
// ===============================

CREATE
(:Job {
    id: 'J001',
    title: 'Java Full Stack Developer'
}),
(:Job {
    id: 'J002',
    title: 'Spring Boot Developer'
}),
(:Job {
    id: 'J003',
    title: 'React Developer'
}),
(:Job {
    id: 'J004',
    title: 'Backend Engineer'
});

// ===============================
// CANDIDATE SKILLS
// ===============================

MATCH (c:Candidate {id: 'C001'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (react:Skill {name: 'React'})
MATCH (postgres:Skill {name: 'PostgreSQL'})
CREATE
(c)-[:HAS_SKILL]->(java),
(c)-[:HAS_SKILL]->(spring),
(c)-[:HAS_SKILL]->(react),
(c)-[:HAS_SKILL]->(postgres);

MATCH (c:Candidate {id: 'C002'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (docker:Skill {name: 'Docker'})
MATCH (aws:Skill {name: 'AWS'})
CREATE
(c)-[:HAS_SKILL]->(java),
(c)-[:HAS_SKILL]->(spring),
(c)-[:HAS_SKILL]->(docker),
(c)-[:HAS_SKILL]->(aws);

MATCH (c:Candidate {id: 'C003'})
MATCH (react:Skill {name: 'React'})
MATCH (javascript:Skill {name: 'JavaScript'})
MATCH (typescript:Skill {name: 'TypeScript'})
MATCH (graphql:Skill {name: 'GraphQL'})
CREATE
(c)-[:HAS_SKILL]->(react),
(c)-[:HAS_SKILL]->(javascript),
(c)-[:HAS_SKILL]->(typescript),
(c)-[:HAS_SKILL]->(graphql);

MATCH (c:Candidate {id: 'C004'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (postgres:Skill {name: 'PostgreSQL'})
MATCH (microservices:Skill {name: 'Microservices'})
CREATE
(c)-[:HAS_SKILL]->(java),
(c)-[:HAS_SKILL]->(spring),
(c)-[:HAS_SKILL]->(postgres),
(c)-[:HAS_SKILL]->(microservices);

// ===============================
// CANDIDATE PROJECTS
// ===============================

MATCH (c:Candidate {id: 'C001'})
MATCH (p:Project {id: 'P001'})
CREATE (c)-[:WORKED_ON]->(p);

MATCH (c:Candidate {id: 'C002'})
MATCH (p:Project {id: 'P002'})
CREATE (c)-[:WORKED_ON]->(p);

MATCH (c:Candidate {id: 'C003'})
MATCH (p:Project {id: 'P003'})
CREATE (c)-[:WORKED_ON]->(p);

MATCH (c:Candidate {id: 'C004'})
MATCH (p:Project {id: 'P004'})
CREATE (c)-[:WORKED_ON]->(p);

// ===============================
// PROJECT SKILLS
// ===============================

MATCH (p:Project {id: 'P001'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (react:Skill {name: 'React'})
MATCH (postgres:Skill {name: 'PostgreSQL'})
CREATE
(p)-[:USES_SKILL]->(java),
(p)-[:USES_SKILL]->(spring),
(p)-[:USES_SKILL]->(react),
(p)-[:USES_SKILL]->(postgres);

MATCH (p:Project {id: 'P002'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (docker:Skill {name: 'Docker'})
CREATE
(p)-[:USES_SKILL]->(java),
(p)-[:USES_SKILL]->(spring),
(p)-[:USES_SKILL]->(docker);

MATCH (p:Project {id: 'P003'})
MATCH (react:Skill {name: 'React'})
MATCH (typescript:Skill {name: 'TypeScript'})
MATCH (graphql:Skill {name: 'GraphQL'})
CREATE
(p)-[:USES_SKILL]->(react),
(p)-[:USES_SKILL]->(typescript),
(p)-[:USES_SKILL]->(graphql);

MATCH (p:Project {id: 'P004'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (postgres:Skill {name: 'PostgreSQL'})
MATCH (microservices:Skill {name: 'Microservices'})
CREATE
(p)-[:USES_SKILL]->(java),
(p)-[:USES_SKILL]->(spring),
(p)-[:USES_SKILL]->(postgres),
(p)-[:USES_SKILL]->(microservices);

// ===============================
// JOB REQUIRED SKILLS
// ===============================

MATCH (j:Job {id: 'J001'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (react:Skill {name: 'React'})
MATCH (postgres:Skill {name: 'PostgreSQL'})
CREATE
(j)-[:REQUIRES_SKILL]->(java),
(j)-[:REQUIRES_SKILL]->(spring),
(j)-[:REQUIRES_SKILL]->(react),
(j)-[:REQUIRES_SKILL]->(postgres);

MATCH (j:Job {id: 'J002'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (microservices:Skill {name: 'Microservices'})
CREATE
(j)-[:REQUIRES_SKILL]->(java),
(j)-[:REQUIRES_SKILL]->(spring),
(j)-[:REQUIRES_SKILL]->(microservices);

MATCH (j:Job {id: 'J003'})
MATCH (react:Skill {name: 'React'})
MATCH (javascript:Skill {name: 'JavaScript'})
MATCH (typescript:Skill {name: 'TypeScript'})
CREATE
(j)-[:REQUIRES_SKILL]->(react),
(j)-[:REQUIRES_SKILL]->(javascript),
(j)-[:REQUIRES_SKILL]->(typescript);

MATCH (j:Job {id: 'J004'})
MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
MATCH (docker:Skill {name: 'Docker'})
MATCH (aws:Skill {name: 'AWS'})
CREATE
(j)-[:REQUIRES_SKILL]->(java),
(j)-[:REQUIRES_SKILL]->(spring),
(j)-[:REQUIRES_SKILL]->(docker),
(j)-[:REQUIRES_SKILL]->(aws);

// ===============================
// JOB COMPANIES
// ===============================

MATCH (j:Job {id: 'J001'})
MATCH (c:Company {id: 'COMP001'})
CREATE (j)-[:OFFERED_BY]->(c);

MATCH (j:Job {id: 'J002'})
MATCH (c:Company {id: 'COMP002'})
CREATE (j)-[:OFFERED_BY]->(c);

MATCH (j:Job {id: 'J003'})
MATCH (c:Company {id: 'COMP003'})
CREATE (j)-[:OFFERED_BY]->(c);

MATCH (j:Job {id: 'J004'})
MATCH (c:Company {id: 'COMP001'})
CREATE (j)-[:OFFERED_BY]->(c);

// ===============================
// RELATED SKILLS
// ===============================

MATCH (java:Skill {name: 'Java'})
MATCH (spring:Skill {name: 'Spring Boot'})
CREATE (java)-[:RELATED_TO]->(spring);

MATCH (javascript:Skill {name: 'JavaScript'})
MATCH (react:Skill {name: 'React'})
CREATE (javascript)-[:RELATED_TO]->(react);

MATCH (postgres:Skill {name: 'PostgreSQL'})
MATCH (microservices:Skill {name: 'Microservices'})
CREATE (postgres)-[:RELATED_TO]->(microservices);