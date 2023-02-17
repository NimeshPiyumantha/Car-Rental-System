package com.easy.car_rental.embeded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

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
public class ImageDTO {
    private MultipartFile front_View;
    private MultipartFile back_View;
    private MultipartFile side_View;
    private MultipartFile interior;
}
