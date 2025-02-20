const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    await toast.promise(
      authService.forgotPassword(email),
      {
        pending: 'Mengirim permintaan reset password...',
        success: 'Link reset password telah dikirim ke email Anda',
        error: {
          render({ data }) {
            return data.message || 'Gagal mengirim permintaan reset password';
          }
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
}; 