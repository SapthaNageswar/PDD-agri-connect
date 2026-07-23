package com.agriconnect.app;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

public class FarmerDashboardFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_farmer_dashboard, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        View btnAdvisory = view.findViewById(R.id.btn_advisory);
        View btnMarketplace = view.findViewById(R.id.btn_marketplace);
        View btnWeather = view.findViewById(R.id.btn_weather);
        View btnPrices = view.findViewById(R.id.btn_prices);

        if (btnAdvisory != null) btnAdvisory.setOnClickListener(v -> Navigation.findNavController(v).navigate(R.id.action_farmer_to_advisory));
        if (btnMarketplace != null) btnMarketplace.setOnClickListener(v -> Navigation.findNavController(v).navigate(R.id.action_farmer_to_marketplace));
        if (btnWeather != null) btnWeather.setOnClickListener(v -> Navigation.findNavController(v).navigate(R.id.action_farmer_to_weather));
        if (btnPrices != null) btnPrices.setOnClickListener(v -> Navigation.findNavController(v).navigate(R.id.action_farmer_to_prices));
    }
}
