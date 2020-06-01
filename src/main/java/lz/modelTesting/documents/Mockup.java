package lz.modelTesting.documents;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@Document(collection = "mockups")
public class Mockup {

    @Id
    private String id;
    @NonNull
    private String name;
    @NonNull
    private String source;
    @NonNull
    private String projectId;
    @NonNull
    private Boolean archived = false;


}