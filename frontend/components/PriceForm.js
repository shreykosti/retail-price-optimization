import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const months = [
  "1", "2", "3", "4", "5", "6",
  "7", "8", "9", "10", "11", "12"
];

const productCategories = ['bed_bath_table', 'garden_tools', 'consoles_games', 'health_beauty',
 'cool_stuff', 'perfumery', 'computers_accessories', 'watches_gifts',
 'furniture_decor'
];

export default function PriceForm({ setPrediction }) {
  const [form, setForm] = useState({
    product_category_name: productCategories[0],
    month: months[0],
    comp_1: '',
    comp_2: '',
    comp_3: '',
    freight_price: '',
    product_weight_g: '',
    qty: '',
    product_score: '',
    volume: ''
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    // Validate all fields are filled
    for (let key in form) {
      if (form[key] === '') {
        Alert.alert('Missing Field', `Please fill in the ${key.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    // Convert numeric fields to proper types
    const formData = {
      ...form,
      comp_1: parseFloat(form.comp_1),
      comp_2: parseFloat(form.comp_2),
      comp_3: parseFloat(form.comp_3),
      freight_price: parseFloat(form.freight_price),
      product_weight_g: parseFloat(form.product_weight_g),
      qty: parseInt(form.qty),
      product_score: parseFloat(form.product_score),
      volume: parseFloat(form.volume)
    };

    try {
      const response = await axios.post(
        'https://ml-api-us34.onrender.com/predict',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setPrediction(response.data);
    } catch (error) {
      Alert.alert('Prediction Error');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#1b263b' }}>
      <View style={[styles.formContainer, { backgroundColor: '#1b263b' }]}>
        <Text style={[styles.title, { color: '#e0e1dd' }]}>Price Predictor</Text>

        {/* Picker Fields */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: '#e0e1dd' }]}>Product Category</Text>
          <View style={[styles.pickerContainer, { backgroundColor: '#0d1b2a', borderColor: '#1b6ca8' }]}>
            <Picker
              selectedValue={form.product_category_name}
              style={[styles.picker, { color: '#e0e1dd', backgroundColor: '#000000' }]}
              dropdownIconColor="#e0e1dd"
              onValueChange={v => handleChange('product_category_name', v)}
            >
              {productCategories.map(cat => (
                <Picker.Item key={cat} label={cat} value={cat} color="#e0e1dd" style={{backgroundColor: '#000000'}} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: '#e0e1dd' }]}>Month</Text>
          <View style={[styles.pickerContainer, { backgroundColor: '#0d1b2a', borderColor: '#1b6ca8' }]}>
            <Picker
              selectedValue={form.month}
              style={[styles.picker, { color: '#e0e1dd', backgroundColor: '#000000' }]}
              dropdownIconColor="#e0e1dd"
              onValueChange={v => handleChange('month', v)}
            >
              {months.map(month => (
                <Picker.Item key={month} label={`Month ${month}`} value={month} color="#e0e1dd" style={{backgroundColor: '#000000'}} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Numeric Input Fields */}
        {[
          { label: 'Competitor 1 Price', name: 'comp_1', placeholder: '50.0' },
          { label: 'Competitor 2 Price', name: 'comp_2', placeholder: '45.0' },
          { label: 'Competitor 3 Price', name: 'comp_3', placeholder: '55.0' },
          { label: 'Freight Price', name: 'freight_price', placeholder: '10.0' },
          { label: 'Product Weight (g)', name: 'product_weight_g', placeholder: '500.0' },
          { label: 'Quantity', name: 'qty', placeholder: '2' },
          { label: 'Product Score', name: 'product_score', placeholder: '4.0' },
          { label: 'Volume', name: 'volume', placeholder: '1000.0' }
        ].map(({ label, name, placeholder }) => (
          <View key={name} style={styles.inputGroup}>
            <Text style={[styles.label, { color: '#e0e1dd' }]}>{label}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#0d1b2a', color: '#e0e1dd', borderColor: '#1b6ca8' }]}
              placeholder={placeholder}
              placeholderTextColor="#a0aec0"
              keyboardType="numeric"
              value={form[name]}
              onChangeText={v => handleChange(name, v)}
            />
          </View>
        ))}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#1b6ca8' }]} onPress={handleSubmit}>
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>Predict Price</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    height: 55,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
