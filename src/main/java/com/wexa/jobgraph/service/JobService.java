package com.wexa.jobgraph.service;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class JobService {

    private final Driver driver;

    public JobService(Driver driver) {
        this.driver = driver;
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
                            .list(record -> Map.of(
                                    "jobId", record.get("jobId").asString(),
                                    "title", record.get("title").asString(),
                                    "company", record.get("company").isNull()
                                            ? ""
                                            : record.get("company").asString()
                            ))
            );
        }
    }
}