package lz.modelTesting.documents;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@Document(collection = "projects")
public class Project {

    @Id
    private String id;
    @NonNull
    private String name;


}