import { useState } from "react";

export function useGeoLocation(defaultPosition = null) {
    const [position, setPosition] = useState(defaultPosition);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    function getGeoLocation() {
        if (!navigator.geolocation) {
            return setError('Your browser does not support geolocation!');
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    return { position, error, isLoading, getGeoLocation };
}
