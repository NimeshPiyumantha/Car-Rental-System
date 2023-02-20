package com.easy.car_rental.controller;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.embeded.Image;
import com.easy.car_rental.embeded.ImageDTO;
import com.easy.car_rental.embeded.Rate;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.service.CarService;
import com.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {
    @Autowired
    private CarService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCar(@ModelAttribute CarDTO dto,@ModelAttribute Rate rate,@ModelAttribute ImageDTO image) {
        dto.setImage(image);
        dto.setRent_Duration_Price(rate);

        System.out.println(dto);
        service.saveCar(dto);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateCar(@ModelAttribute CarDTO dto/*,@ModelAttribute Rate rate,@ModelAttribute ImageDTO image*/) {
      /*  dto.setImage(image);
        dto.setRent_Duration_Price(rate);*/
        System.out.println(dto.getName());
        System.out.println(dto.getCar_Id());

        System.out.println(dto);
//        service.updateCar(dto);
        return new ResponseUtil("OK", "Successfully Updated. :" + dto.getCar_Id(), null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteCar(@RequestParam String id) {
        service.deleteCar(id);
        return new ResponseUtil("OK", "Successfully Deleted. :" + id, null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAllCars")
    public ResponseUtil getAllCar() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.getAllCar());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/carIDGenerate")
    public @ResponseBody CustomDTO customerIdGenerate() {
        return service.carIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchCar", params = {"car_Id"})
    public Car searchCusId(String car_Id) {
        return service.searchCarId(car_Id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/carCount")
    public @ResponseBody CustomDTO getSumCustomer() {
        return service.getSumCar();
    }

}
