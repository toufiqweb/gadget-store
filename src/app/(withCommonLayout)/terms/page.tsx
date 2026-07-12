export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Terms of Service</h1>
      <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using Gadget Store, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
        <p>Gadget Store provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, and personalized content. You understand and agree that the Service may include advertisements and that these advertisements are necessary for Gadget Store to provide the Service.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. User Account, Password, and Security</h2>
        <p>You will receive a password and account designation upon completing the Service&apos;s registration process. You are responsible for maintaining the confidentiality of the password and account and are fully responsible for all activities that occur under your password or account.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Modifications to Service</h2>
        <p>Gadget Store reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Gadget Store shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.</p>
      </div>
    </div>
  );
}
