import { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';
import { useApp } from '../context/AppContext';

export function useScanner() {
    const { addScanHistory } = useApp();
    const [permission, requestCameraPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(false);
    const [lastScannedValue, setLastScannedValue] = useState<string | null>(null);
    const [linkInput, setLinkInput] = useState('');

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (data === lastScannedValue || isScanning) return;
        
        setLastScannedValue(data);
        setIsScanning(true);
        
        // Add to history
        addScanHistory({
            id: Date.now().toString(),
            barcode: data,
            timestamp: Date.now(),
        });

        // TODO: Call backend API to process scan
        // For now, just show alert
        Alert.alert('Scanned', `Detected barcode: ${data}`, [
            { text: 'OK', onPress: () => setIsScanning(false) }
        ]);
    };

    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission needed', 'Allow access to your photos to upload an image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled && result.assets?.length) {
            const asset = result.assets[0];
            setIsScanning(true);
            
            // Add to history
            addScanHistory({
                id: Date.now().toString(),
                imageUri: asset.uri,
                timestamp: Date.now(),
            });

            // TODO: Call backend API to process image
            Alert.alert('Image selected', 'We will scan this image shortly.', [
                { text: 'OK', onPress: () => setIsScanning(false) }
            ]);
        }
    };

    const handleLinkScan = async () => {
        if (!linkInput.trim()) {
            Alert.alert('Missing link', 'Please paste or type a link to scan.');
            return;
        }

        setIsScanning(true);
        
        // Add to history
        addScanHistory({
            id: Date.now().toString(),
            link: linkInput.trim(),
            timestamp: Date.now(),
        });

        // TODO: Call backend API to process link
        Alert.alert('Scanning link', linkInput.trim(), [
            { text: 'OK', onPress: () => {
                setIsScanning(false);
                setLinkInput('');
            }}
        ]);
    };

    const handlePasteLink = async () => {
        const text = await Clipboard.getStringAsync();
        if (!text) {
            Alert.alert('Clipboard empty', 'Copy a link first, then paste.');
            return;
        }
        setLinkInput(text);
    };

    return {
        permission,
        requestCameraPermission,
        isScanning,
        lastScannedValue,
        linkInput,
        setLinkInput,
        handleBarcodeScanned,
        handleImageUpload,
        handleLinkScan,
        handlePasteLink,
    };
}
