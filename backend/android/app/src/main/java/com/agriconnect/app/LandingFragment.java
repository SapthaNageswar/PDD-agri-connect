package com.agriconnect.app;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

public class LandingFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_landing, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Button btnGetStarted = view.findViewById(R.id.btn_get_started);
        Button btnLogin = view.findViewById(R.id.btn_login);

        if (btnGetStarted != null) {
            btnGetStarted.setOnClickListener(v ->
                Navigation.findNavController(v).navigate(R.id.action_landing_to_auth));
        }
        if (btnLogin != null) {
            btnLogin.setOnClickListener(v ->
                Navigation.findNavController(v).navigate(R.id.action_landing_to_auth));
        }
    }
}
