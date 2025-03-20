
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate sending OTP
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP sent successfully",
        description: `We've sent a verification code to ${phoneNumber}`,
      });
      // For demo, let's pretend the OTP is 123456
    }, 1500);
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!otp || otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid verification code.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate OTP verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      if (otp === '123456') {
        toast({
          title: "Authentication successful",
          description: "You have been successfully logged in.",
        });
        // Redirect to home after success
        window.location.href = '/';
      } else {
        toast({
          title: "Invalid OTP",
          description: "The verification code you entered is incorrect. Try again, or use 123456 for this demo.",
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <section className="py-12">
          <div className="container">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <div className="text-center mb-8">
                  <div className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-goorder-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-goorder-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2v-4a2 2 0 00-2-2h-3v6h3zm-5 0V15H9v6h5zm-9 0h2v-6H5v4a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Login to GoOrder</h1>
                  <p className="text-gray-600">
                    Access your account using your phone number
                  </p>
                </div>
                
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    {step === 'phone' ? (
                      <form onSubmit={handlePhoneSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                className="pl-10"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              We'll send a verification code to this number
                            </p>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-goorder-600 hover:bg-goorder-700 h-11"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending Code...
                              </>
                            ) : (
                              <>
                                Continue <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleOtpSubmit}>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="otp">Verification Code</Label>
                              <button 
                                type="button"
                                className="text-xs text-goorder-600 hover:text-goorder-700"
                                onClick={() => setStep('phone')}
                              >
                                Change Number
                              </button>
                            </div>
                            <div className="relative mt-2">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="otp"
                                type="text"
                                placeholder="Enter 6-digit code"
                                className="pl-10"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                Sent to {phoneNumber}
                              </p>
                              <button 
                                type="button"
                                className="text-xs text-goorder-600 hover:text-goorder-700"
                              >
                                Resend Code
                              </button>
                            </div>
                            
                            <p className="mt-4 text-xs text-gray-500">
                              For this demo, the verification code is: <span className="font-semibold">123456</span>
                            </p>
                          </div>
                          
                          <Button 
                            type="submit"
                            className="w-full bg-goorder-600 hover:bg-goorder-700 h-11"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              "Verify & Login"
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <form onSubmit={handlePhoneSubmit}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="Enter first name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Enter last name"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="registerPhone">Phone Number</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              id="registerPhone"
                              type="tel"
                              placeholder="Enter your phone number"
                              className="pl-10"
                              required
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            We'll send a verification code to this number
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email (Optional)</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 rounded border-gray-300 text-goorder-600 focus:ring-goorder-500"
                            required
                          />
                          <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <Link to="#" className="text-goorder-600 hover:text-goorder-700">Terms of Service</Link> and <Link to="#" className="text-goorder-600 hover:text-goorder-700">Privacy Policy</Link>
                          </label>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-goorder-600 hover:bg-goorder-700 h-11"
                        >
                          Register <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-600">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
