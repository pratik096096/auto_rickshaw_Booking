package com.example.autorickshawbooking.Controller;

import com.example.autorickshawbooking.entity.Place;
import com.example.autorickshawbooking.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @PostMapping
    public Place addPlace(@RequestBody Place place) {
        return placeService.addPlace(place);
    }
}
