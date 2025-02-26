package com.example.autorickshawbooking;

import com.example.autorickshawbooking.entity.Place;
import com.example.autorickshawbooking.repository.PlaceRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<List<Place>> typeReference = new TypeReference<List<Place>>() {};
        InputStream inputStream = new ClassPathResource("places.json").getInputStream();
        try {
            List<Place> places = objectMapper.readValue(inputStream, typeReference);
            placeRepository.saveAll(places);
            System.out.println("Places have been loaded into the database.");
        } catch (Exception e) {
            System.out.println("Unable to load places: " + e.getMessage());
        }
    }
}
