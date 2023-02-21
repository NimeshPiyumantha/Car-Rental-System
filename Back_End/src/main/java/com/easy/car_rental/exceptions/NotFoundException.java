package com.easy.car_rental.exceptions;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/


public class NotFoundException extends RuntimeException{
    public NotFoundException(String message) {
        super(message);
    }
}
