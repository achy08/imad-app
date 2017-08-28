package ac.myapp;

import android.content.DialogInterface;
import android.os.StrictMode;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    TextView textView;
    EditText editText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = (TextView) findViewById(R.id.textView);
        //Setting some text
        //todo: String resource file
        textView.setText("New Text");

        editText = (EditText) findViewById(R.id.textEditBox);

        Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //gets called when the button is clicked
                String enteredText = editText.getText().toString().trim();
                if (enteredText.isEmpty()){
                    //Show an alert
                    showAlert();
                } else{
                    //Update text in textView
                    replaceText(enteredText);
                    Toast.makeText(MainActivity.this, "Comment Added", Toast.LENGTH_LONG).show();
                    editText.setText("");
                }
            }
        });
    }

    private void replaceText(String newText){
        textView.setText(newText);
    }

    private void showAlert(){
        //Building the dialog
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Empty!");
        builder.setMessage("No comment added");
        builder.setNeutralButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        builder.show();
    }
}
