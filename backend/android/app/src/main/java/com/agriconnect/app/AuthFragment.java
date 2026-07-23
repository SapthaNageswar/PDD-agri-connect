package com.agriconnect.app;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;

public class AuthFragment extends Fragment {

    private FirebaseAuth mAuth;
    private FirebaseFirestore db;
    private boolean isLogin = true;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_auth, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();

        EditText etEmail = view.findViewById(R.id.et_email);
        EditText etPassword = view.findViewById(R.id.et_password);
        Button btnSubmit = view.findViewById(R.id.btn_submit);
        TextView tvToggle = view.findViewById(R.id.tv_toggle);
        ProgressBar progressBar = view.findViewById(R.id.progress_bar);

        if (btnSubmit != null) {
            btnSubmit.setOnClickListener(v -> {
                String email = etEmail != null ? etEmail.getText().toString().trim() : "";
                String password = etPassword != null ? etPassword.getText().toString().trim() : "";

                if (TextUtils.isEmpty(email) || TextUtils.isEmpty(password)) {
                    Toast.makeText(getContext(), "Please fill all fields", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (progressBar != null) progressBar.setVisibility(View.VISIBLE);

                if (isLogin) {
                    mAuth.signInWithEmailAndPassword(email, password)
                        .addOnCompleteListener(task -> {
                            if (progressBar != null) progressBar.setVisibility(View.GONE);
                            if (task.isSuccessful()) {
                                navigateByRole(view, mAuth.getCurrentUser());
                            } else {
                                Toast.makeText(getContext(), "Login failed: " +
                                    (task.getException() != null ? task.getException().getMessage() : "unknown error"),
                                    Toast.LENGTH_LONG).show();
                            }
                        });
                } else {
                    mAuth.createUserWithEmailAndPassword(email, password)
                        .addOnCompleteListener(task -> {
                            if (progressBar != null) progressBar.setVisibility(View.GONE);
                            if (task.isSuccessful()) {
                                navigateByRole(view, mAuth.getCurrentUser());
                            } else {
                                Toast.makeText(getContext(), "Registration failed: " +
                                    (task.getException() != null ? task.getException().getMessage() : "unknown error"),
                                    Toast.LENGTH_LONG).show();
                            }
                        });
                }
            });
        }

        if (tvToggle != null) {
            tvToggle.setOnClickListener(v -> {
                isLogin = !isLogin;
                if (btnSubmit != null) btnSubmit.setText(isLogin ? "Login" : "Register");
                tvToggle.setText(isLogin ? "Don't have an account? Register" : "Already have an account? Login");
            });
        }
    }

    private void navigateByRole(View view, FirebaseUser user) {
        if (user == null) return;
        db.collection("users").document(user.getUid()).get()
            .addOnSuccessListener(doc -> {
                String role = doc.exists() ? doc.getString("role") : "farmer";
                if (role == null) role = "farmer";
                int action;
                switch (role) {
                    case "buyer": action = R.id.action_auth_to_buyer; break;
                    case "admin": action = R.id.action_auth_to_admin; break;
                    default: action = R.id.action_auth_to_farmer; break;
                }
                Navigation.findNavController(view).navigate(action);
            })
            .addOnFailureListener(e ->
                Navigation.findNavController(view).navigate(R.id.action_auth_to_farmer));
    }
}
