package lz.modelTesting.documents;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@Document(collection = "highlights")
public class Highlight {

    @Id
    private String id;
    @NonNull
    private String mockupId;
    @NonNull
    private String questionNumber;
    @NonNull
    private String width;
    @NonNull
    private String height ;
    @NonNull
    private String posX;
    @NonNull
    private String posY;




}
