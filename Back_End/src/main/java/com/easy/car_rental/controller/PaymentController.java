package com.easy.car_rental.controller;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService service;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/paymentIdGenerate")
    public @ResponseBody CustomDTO customerIdGenerate() {
        return service.paymentIdGenerate();
    }

}
