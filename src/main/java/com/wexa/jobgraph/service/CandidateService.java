package com.wexa.jobgraph.service;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CandidateService {

    private final Driver driver;

    public CandidateService(Driver driver) {
        this.driver = driver;
    }

    // Get all candidates
    public List<Map<String, Object>> getAllCandidates() {

        String query = """
                MATCH (c:Candidate)
                RETURN c.id AS id,
                       c.name AS name,
                       c.experience AS experience
                ORDER BY c.name
                """;

        try (Session session = driver.session()) {

            return session.run(query)
                    .list(record -> Map.of(
                            "id", record.get("id").asString(),
                            "name", record.get("name").asString(),
                            "experience", record.get("experience").asInt()
                    ));
        }
    }


    // Get candidates matching a particular job
    public List<Map<String, Object>> getJobMatches(String jobId) {

        String query = """
                MATCH (c:Candidate)-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES_SKILL]-(j:Job)
                WHERE j.id = $jobId
                RETURN
                    c.id AS candidateId,
                    c.name AS candidate,
                    count(s) AS matchingSkills,
                    collect(s.name) AS skills
                ORDER BY matchingSkills DESC
                """;

        try (Session session = driver.session()) {

            return session.run(
                    query,
                    Map.of("jobId", jobId)
            ).list(record -> Map.of(
                    "candidateId", record.get("candidateId").asString(),
                    "candidate", record.get("candidate").asString(),
                    "matchingSkills", record.get("matchingSkills").asInt(),
                    "skills", record.get("skills")
                            .asList(value -> value.asString())
            ));
        }
    }

    public List<Map<String, Object>> getAllJobs() {

        String query = """
            MATCH (j:Job)
            OPTIONAL MATCH (j)-[:OFFERED_BY]->(c:Company)
            RETURN
                j.id AS jobId,
                j.title AS title,
                c.name AS company
            ORDER BY j.title
            """;

        try (Session session = driver.session()) {
            return session.executeRead(tx ->
                    tx.run(query)
                            .list(record -> {
                                Map<String, Object> result = new HashMap<>();

                                result.put("jobId", record.get("jobId").asString());
                                result.put("title", record.get("title").asString());

                                if (record.get("company").isNull()) {
                                    result.put("company", "");
                                } else {
                                    result.put("company",
                                            record.get("company").asString());
                                }

                                return result;
                            })
            );
        }
    }

    public List<Map<String, Object>> getProjectBasedMatches(String jobId) {

        String query = """
            MATCH (c:Candidate)
                  -[:WORKED_ON]->(p:Project)
                  -[:USES_SKILL]->(s:Skill)
                  <-[:REQUIRES_SKILL]-(j:Job)
            WHERE j.id = $jobId
            RETURN
                c.id AS candidateId,
                c.name AS candidate,
                collect(DISTINCT p.name) AS projects,
                collect(DISTINCT s.name) AS matchingSkills,
                count(DISTINCT s) AS matchingSkillsCount
            ORDER BY matchingSkillsCount DESC
            """;

        try (Session session = driver.session()) {

            return session.executeRead(tx ->
                    tx.run(
                            query,
                            Map.of("jobId", jobId)
                    ).list(record -> {

                        Map<String, Object> result = new HashMap<>();

                        result.put(
                                "candidateId",
                                record.get("candidateId").asString()
                        );

                        result.put(
                                "candidate",
                                record.get("candidate").asString()
                        );

                        result.put(
                                "projects",
                                record.get("projects").asList()
                        );

                        result.put(
                                "matchingSkills",
                                record.get("matchingSkills").asList()
                        );

                        result.put(
                                "matchingSkillsCount",
                                record.get("matchingSkillsCount").asInt()
                        );

                        return result;
                    })
            );
        }
    }


}