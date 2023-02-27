package com.easy.car_rental.advisor;

import com.easy.car_rental.util.ResponseUtil;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@RestControllerAdvice
@CrossOrigin
public class AppWideExceptionHandler {
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({RuntimeException.class})
    public ResponseUtil handleMyExceptions(RuntimeException e) {
        System.out.println(e);
        return new ResponseUtil("Error", e.getMessage(), null);
    }

/*    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseUtil handleMyExceptions(ConstraintViolationException e) {
        return new ResponseUtil("Error", "Done", null);
    }*/

}
