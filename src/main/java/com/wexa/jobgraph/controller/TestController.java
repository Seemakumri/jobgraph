package com.wexa.jobgraph.controller;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final Driver driver;

    public TestController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping("/api/test-db")
    public String testDatabase() {

        try (Session session = driver.session()) {

            String result = session
                    .run("RETURN 'CognoDB connection successful!' AS message")
                    .single()
                    .get("message")
                    .asString();

            return result;

        } catch (Exception e) {
            return "CognoDB connection failed: " + e.getMessage();
        }
    }
}