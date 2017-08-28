package ac.myblogapp;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class AuthenticationActivity extends AppCompatActivity {

    EditText username, password;
    ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_authentication);

        username = (EditText) findViewById(R.id.userName);
        password = (EditText) findViewById(R.id.password);

        Button loginButton = (Button) findViewById(R.id.btn_login);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isFormValid()){
                    //perform login
                    login();
                }
            }
        });
        
        Button registerButton = (Button) findViewById(R.id.btn_register);
        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(isFormValid()){
                    // perform register
                    register();
                }
            }
        });

        //initialise progress dialog
        progressDialog = new ProgressDialog(this);
        progressDialog.setIndeterminate(false);
        progressDialog.setMessage("Please wait");
    }

    private boolean isFormValid() {
        if (username.getText().toString().trim().isEmpty()){
            Toast.makeText(this, "Username Please", Toast.LENGTH_SHORT).show();
            return false;
        }
        if(password.getText().toString().trim().isEmpty()){
            Toast.makeText(this, "Password Please", Toast.LENGTH_SHORT).show();
            return false;
        }

        return true;
    }


    private void register() {
    }

    private void login() {
        new loginTask().execute(username.getText().toString(), password.getText().toString());
    }

    private void showProgressDialog(Boolean shouldShould){
        if (shouldShould){
            progressDialog.show();
        } else progressDialog.dismiss();

    }

    private void showAlert(String title, String message){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(title);
        builder.setMessage(message);
        builder.setNeutralButton("Dismiss", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        builder.show();
    }

    class loginTask extends AsyncTask<String, Void, Boolean>{

        String mockUser = "test";
        String mockPass = "password";

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            showProgressDialog(true);
        }

        @Override
        protected void onPostExecute(Boolean aBoolean) {
            super.onPostExecute(aBoolean);
            showProgressDialog(false);
            if(aBoolean){
                showAlert("Welcome", "You are logged in");

            } else showAlert("Disaster", "I don't know you");
        }

        @Override
        protected Boolean doInBackground(String... params) {
            String username = params[0];
            String password = params[1];
            return username.contentEquals(mockUser)&& password.contentEquals(mockPass);
        }
    }
}