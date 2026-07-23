import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  BrainCircuit,
  Sprout,
  Bug,
  CloudRain,
  AlertCircle,
  CheckCircle2 } from
'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Tabs,
  Badge } from
'../components/ui';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const DISEASE_DATABASE = [
  {
    key: 'early_blight',
    crop: 'Tomato',
    symptom: 'Concentric dark spots or rings on lower leaves',
    disease: 'Early Blight (Alternaria solani)',
    confidence: '94%',
    severity: 'Moderate',
    productId: 'fungicide_copper',
    productName: 'Copper Fungicide Spray',
    treatment: [
      'Remove and destroy infected lower leaves.',
      'Apply copper-based fungicide immediately.',
      'Ensure proper spacing for air circulation.',
      'Avoid overhead watering to keep leaves dry.'
    ]
  },
  {
    key: 'common_rust',
    crop: 'Corn/Maize',
    symptom: 'Yellow-orange powdery spots/pustules on leaves',
    disease: 'Common Rust (Puccinia sorghi)',
    confidence: '92%',
    severity: 'Moderate',
    productId: 'fungicide_mancozeb',
    productName: 'Mancozeb Fungicide Powder',
    treatment: [
      'Remove infected leaves at the bottom of the plant.',
      'Apply Mancozeb fungicide powder to control spread.',
      'Use disease-resistant corn varieties in the future.',
      'Keep crop leaves dry by using drip irrigation.'
    ]
  },
  {
    key: 'rice_blast',
    crop: 'Rice',
    symptom: 'Elongated diamond-shaped lesions with grey centers',
    disease: 'Rice Blast (Magnaporthe oryzae)',
    confidence: '95%',
    severity: 'High',
    productId: 'fungicide_tricyclazole',
    productName: 'Tricyclazole Blast Control',
    treatment: [
      'Avoid high nitrogen fertilizer application which favors blast.',
      'Apply Tricyclazole Blast Control fungicide.',
      'Flood fields properly to reduce disease severity.',
      'Burn or decompose infected straw to reduce overwintering spore populations.'
    ]
  },
  {
    key: 'powdery_mildew',
    crop: 'Wheat',
    symptom: 'Powdery white patches on leaf surface',
    disease: 'Powdery Mildew (Blumeria graminis)',
    confidence: '91%',
    severity: 'Low',
    productId: 'fungicide_sulfur',
    productName: 'Sulfur Fungicide Powder',
    treatment: [
      'Avoid excessive dense crop planting to improve airflow.',
      'Apply Sulfur Fungicide Powder during early stages.',
      'Destroy crop residue post-harvest.',
      'Ensure adequate direct sunlight exposure for the plants.'
    ]
  },
  {
    key: 'pest_infestation',
    crop: 'General/Other',
    symptom: 'Tiny green or black insects clustered on stems/leaves',
    disease: 'Aphid / Pest Infestation',
    confidence: '89%',
    severity: 'Moderate',
    productId: '5',
    productName: 'Neem Based Bio-Pesticide',
    treatment: [
      'Introduce beneficial insect predators like ladybugs.',
      'Spray Neem Based Bio-Pesticide thoroughly on leaves.',
      'Remove heavily infested plant parts immediately.',
      'Wash pests off leaves with a strong stream of water if early.'
    ]
  }
];

export const Advisory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('disease');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showManualForm, setShowManualForm] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedSymptom, setSelectedSymptom] = useState('Concentric dark spots or rings on lower leaves');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
      const filename = file.name.toLowerCase();
      setIsAnalyzing(true);
      setResult(null);
      // Simulate AI processing
      setTimeout(() => {
        setIsAnalyzing(false);
        let match = DISEASE_DATABASE.find(d => {
          const cropName = d.crop.toLowerCase().split('/')[0];
          const diseaseName = d.disease.toLowerCase();
          const symptomName = d.symptom.toLowerCase();
          return filename.includes(cropName) || 
                 filename.includes(diseaseName.split(' ')[0]) || 
                 filename.includes(symptomName.split(' ')[0]) ||
                 (d.key === 'common_rust' && filename.includes('rust')) ||
                 (d.key === 'rice_blast' && filename.includes('blast')) ||
                 (d.key === 'powdery_mildew' && filename.includes('mildew')) ||
                 (d.key === 'pest_infestation' && (filename.includes('pest') || filename.includes('bug') || filename.includes('aphid') || filename.includes('insect')));
        });
        
        if (!match) {
          match = DISEASE_DATABASE[0]; // Fallback to Tomato Early Blight
          toast.info('Auto-scanner matched with default profile. Adjust symptoms manually if incorrect.');
        } else {
          toast.success(`Analysis complete! Identified ${match.disease}`);
        }
        setResult(match);
        if (auth.currentUser?.uid) {
          addDoc(collection(db, 'advisories'), {
            uid: auth.currentUser.uid,
            topic: match.disease,
            type: 'disease_detection',
            createdAt: new Date().toISOString(),
          }).catch(console.error);
        }
      }, 2500);
    }
  };

  const handleManualDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      const match = DISEASE_DATABASE.find(d => d.crop === selectedCrop && d.symptom === selectedSymptom) 
                 || DISEASE_DATABASE.find(d => d.crop === selectedCrop)
                 || DISEASE_DATABASE[0];
      setResult(match);
      toast.success('Diagnosis complete!');
      if (auth.currentUser?.uid) {
        addDoc(collection(db, 'advisories'), {
          uid: auth.currentUser.uid,
          topic: match.disease,
          type: 'manual_diagnosis',
          createdAt: new Date().toISOString(),
        }).catch(console.error);
      }
    }, 1500);
  };

  const handleBuyFungicide = () => {
    if (result && result.productId) {
      navigate(`/marketplace/${result.productId}`);
    } else {
      navigate('/marketplace?search=fungicide');
    }
  };

  const handleCropRec = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        type: 'crop_rec',
        recommendations: [
        {
          crop: 'Soybean',
          score: 92,
          reason: 'Ideal for current soil pH and upcoming monsoon season.'
        },
        {
          crop: 'Cotton',
          score: 85,
          reason: 'Good market demand, suitable for black soil.'
        },
        {
          crop: 'Maize',
          score: 78,
          reason: 'Requires less water, good rotation crop.'
        }]

      });
      toast.success('Recommendations generated!');
      if (auth.currentUser?.uid) {
        addDoc(collection(db, 'advisories'), {
          uid: auth.currentUser.uid,
          topic: 'Crop Recommendation',
          type: 'crop_recommendation',
          createdAt: new Date().toISOString(),
        }).catch(console.error);
      }
    }, 2000);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-agri-100 mb-4">
          <BrainCircuit className="h-8 w-8 text-agri-600" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-earth-900 mb-2">
          AI Smart Advisory
        </h1>
        <p className="text-earth-600">
          Powered by advanced machine learning to help you make better farming
          decisions.
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
        {
          id: 'disease',
          label: 'Disease Detection'
        },
        {
          id: 'crop',
          label: 'Crop Recommendation'
        },
        {
          id: 'fertilizer',
          label: 'Fertilizer Advice'
        }]
        } />
      

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -10
          }}
          transition={{
            duration: 0.2
          }}>
          
          {activeTab === 'disease' &&
          <Card>
              <CardContent className="p-6 sm:p-8">
                {!result && !isAnalyzing && (
                  !showManualForm ? (
                    <div className="space-y-6">
                      <div className="border-2 border-dashed border-earth-300 rounded-2xl p-12 text-center hover:bg-earth-50 transition-colors cursor-pointer relative">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                          onChange={handleImageUpload}
                        />
                        <Upload className="h-12 w-12 text-earth-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-earth-900 mb-1">
                          Upload Crop Image
                        </h3>
                        <p className="text-sm text-earth-500">
                          Take a clear photo of the affected leaves or fruit.
                        </p>
                        <Button variant="outline" className="mt-6 pointer-events-none">
                          Select Photo
                        </Button>
                      </div>
                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowManualForm(true);
                            setSelectedCrop('Tomato');
                            setSelectedSymptom('Concentric dark spots or rings on lower leaves');
                          }}
                          className="text-agri-600 hover:text-agri-700 font-semibold text-sm transition-colors underline hover:no-underline"
                        >
                          Can't scan or auto-identification failed? Diagnose manually
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleManualDiagnose} className="space-y-6">
                      <div className="bg-earth-50 border border-earth-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-earth-900 mb-4">
                          Diagnose Disease by Symptoms
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">
                              Select Crop
                            </label>
                            <select
                              value={selectedCrop}
                              onChange={(e) => {
                                const crop = e.target.value;
                                setSelectedCrop(crop);
                                const symptoms = DISEASE_DATABASE.filter(d => d.crop === crop);
                                if (symptoms.length > 0) {
                                  setSelectedSymptom(symptoms[0].symptom);
                                }
                              }}
                              className="flex h-10 w-full rounded-md border border-earth-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
                            >
                              <option value="Tomato">Tomato</option>
                              <option value="Corn/Maize">Corn/Maize</option>
                              <option value="Rice">Rice</option>
                              <option value="Wheat">Wheat</option>
                              <option value="General/Other">General/Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">
                              Select Symptoms
                            </label>
                            <select
                              value={selectedSymptom}
                              onChange={(e) => setSelectedSymptom(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-earth-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500"
                            >
                              {DISEASE_DATABASE.filter(d => d.crop === selectedCrop).map((d) => (
                                <option key={d.key} value={d.symptom}>
                                  {d.symptom}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowManualForm(false)}
                        >
                          Back to Upload
                        </Button>
                        <Button type="submit">
                          Identify Disease
                        </Button>
                      </div>
                    </form>
                  )
                )}

                {isAnalyzing &&
              <div className="py-20 text-center">
                    <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'linear'
                  }}
                  className="inline-block mb-6">
                  
                      <BrainCircuit className="h-16 w-16 text-agri-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-earth-900 mb-2">
                      AI is analyzing your image...
                    </h3>
                    <p className="text-earth-500">
                      Scanning for over 100+ known plant diseases and pests.
                    </p>
                  </div>
              }

                {result && result.disease &&
              <div className="space-y-6">
                    <div className="flex items-start justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Bug className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-red-900">
                            {result.disease}
                          </h3>
                          <p className="text-red-700 text-sm">
                            Detected in {result.crop} • Severity:{' '}
                            {result.severity}
                          </p>
                        </div>
                      </div>
                      <Badge variant="danger">
                        Confidence: {result.confidence}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold text-earth-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-agri-600" />{' '}
                        Recommended Treatment
                      </h4>
                      <ul className="space-y-3">
                        {result.treatment.map((step: string, i: number) =>
                    <li
                      key={i}
                      className="flex items-start gap-3 text-earth-700 bg-earth-50 p-3 rounded-lg border border-earth-100">
                      
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-agri-100 text-agri-700 flex items-center justify-center text-sm font-bold">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                    )}
                      </ul>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-earth-200">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setResult(null);
                          setShowManualForm(false);
                        }}
                      >
                        Scan Another
                      </Button>
                      <Button onClick={handleBuyFungicide}>
                        Buy Recommended {result.productId === '5' ? 'Pesticide' : 'Fungicide'}
                      </Button>
                    </div>
                  </div>
              }
              </CardContent>
            </Card>
          }

          {activeTab === 'crop' &&
          <Card>
              <CardContent className="p-6 sm:p-8">
                {!result && !isAnalyzing &&
              <form onSubmit={handleCropRec} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Soil Type
                        </label>
                        <select className="flex h-10 w-full rounded-md border border-earth-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500">
                          <option>Black Soil</option>
                          <option>Red Soil</option>
                          <option>Alluvial Soil</option>
                          <option>Laterite Soil</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Season
                        </label>
                        <select className="flex h-10 w-full rounded-md border border-earth-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agri-500">
                          <option>Kharif (Monsoon)</option>
                          <option>Rabi (Winter)</option>
                          <option>Zaid (Summer)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Average Rainfall (mm)
                        </label>
                        <Input type="number" defaultValue="800" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">
                          Farm Size (Acres)
                        </label>
                        <Input type="number" defaultValue="5" />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Generate Recommendations
                    </Button>
                  </form>
              }

                {isAnalyzing &&
              <div className="py-20 text-center">
                    <motion.div
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5
                  }}
                  className="inline-block mb-6">
                  
                      <Sprout className="h-16 w-16 text-agri-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-earth-900 mb-2">
                      Analyzing soil and climate data...
                    </h3>
                  </div>
              }

                {result && result.type === 'crop_rec' &&
              <div className="space-y-6">
                    <h3 className="text-xl font-bold text-earth-900 mb-4">
                      Top Recommendations
                    </h3>
                    <div className="space-y-4">
                      {result.recommendations.map((rec: any, i: number) =>
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-earth-200 rounded-xl shadow-sm gap-4">
                    
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-agri-100 flex items-center justify-center font-bold text-agri-700 text-lg">
                              #{i + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-earth-900 text-lg">
                                {rec.crop}
                              </h4>
                              <p className="text-sm text-earth-500">
                                {rec.reason}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                        variant="success"
                        className="text-sm py-1 px-3">
                        
                              Match: {rec.score}%
                            </Badge>
                          </div>
                        </div>
                  )}
                    </div>
                    <Button
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="w-full mt-4">
                  
                      Start Over
                    </Button>
                  </div>
              }
              </CardContent>
            </Card>
          }

          {activeTab === 'fertilizer' &&
          <Card>
              <CardContent className="p-12 text-center">
                <CloudRain className="h-16 w-16 text-earth-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-earth-900 mb-2">
                  Connect Soil Sensor
                </h3>
                <p className="text-earth-500 max-w-md mx-auto mb-6">
                  For accurate NPK fertilizer recommendations, please input your
                  latest soil test report values or connect a smart soil sensor.
                </p>
                <Button>Enter Soil Test Data</Button>
              </CardContent>
            </Card>
          }
        </motion.div>
      </AnimatePresence>
    </div>);

};