MATCH (c:Candidate)
RETURN c
ORDER BY c.name

MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)
RETURN c.name AS candidate, collect(s.name) AS skills

$candidateId

MATCH (c:Candidate)-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES_SKILL]-(j:Job)
WHERE j.id = $jobId
RETURN
    c.id AS candidateId,
    c.name AS candidate,
    count(s) AS matchingSkills,
    collect(s.name) AS skills
ORDER BY matchingSkills DESC

MATCH (c:Candidate)-[:HAS_SKILL]->(candidateSkill:Skill)
MATCH (j:Job {id: $jobId})-[:REQUIRES_SKILL]->(requiredSkill:Skill)
MATCH (candidateSkill)-[:RELATED_TO]->(relatedSkill:Skill)
WHERE relatedSkill = requiredSkill
RETURN
    c.name AS candidate,
    candidateSkill.name AS candidateSkill,
    requiredSkill.name AS requiredSkill

    