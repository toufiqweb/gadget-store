export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, and other information you choose to provide.</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We may use the information we collect about you to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide, maintain, and improve our services;</li>
          <li>Perform internal operations, including, for example, to prevent fraud and abuse of our services;</li>
          <li>Send or facilitate communications between you and a delivery partner;</li>
          <li>Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of Gadget Store.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@gadgetstore.com.</p>
      </div>
    </div>
  );
}
