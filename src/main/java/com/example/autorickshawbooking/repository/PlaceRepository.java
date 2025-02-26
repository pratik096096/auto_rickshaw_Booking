package com.example.autorickshawbooking.repository;

import com.example.autorickshawbooking.entity.Place;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlaceRepository extends MongoRepository<Place, String> {
}
