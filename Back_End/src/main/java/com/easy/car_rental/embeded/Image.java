package com.easy.car_rental.embeded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Image {
    private String front_View;
    private String back_View;
    private String side_View;
    private String interior;
}
