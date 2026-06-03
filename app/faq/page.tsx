export default function FAQ() {
  const faqs = [
    {
      q: "What does this tool do?",
      a: "It shows you how your Product Hunt listing will look before you launch. Just paste your Product Hunt URL and see a preview with all your details - catches broken images, formatting issues, and truncated text before launch day."
    },
    {
      q: "Do I need to sign up?",
      a: "No signup required. Just paste your Product Hunt URL and get instant preview. Takes 30 seconds."
    },
    {
      q: "What Product Hunt URL should I use?",
      a: "Use your upcoming Product Hunt listing URL. If you haven't created it yet, you'll need to create your listing first on Product Hunt, then paste that URL here."
    },
    {
      q: "What problems does it catch?",
      a: "Common issues: broken image links, taglines that get truncated, descriptions that are too long, formatting problems in maker comments, missing tags, and URL typos."
    },
    {
      q: "Can I use this for upcoming launches?",
      a: "Yes! That's the best time to use it - before you launch. Check your preview, fix any issues, and launch with confidence."
    },
    {
      q: "Is my data stored?",
      a: "No. Your Product Hunt data is fetched and displayed in your browser. Nothing is sent to any server except Product Hunt's public API."
    },
    {
      q: "What if the preview looks wrong?",
      a: "Product Hunt's API might be rate-limited or your listing might not be public yet. Try again in a few minutes or make sure your listing is publicly accessible."
    },
    {
      q: "Who built this?",
      a: "A solo developer tired of launching broken Product Hunt listings. Built to help indie makers launch confidently."
    },
    {
      q: "Can I give feedback?",
      a: "Please! If you find bugs, have suggestions, or want to share your launch story, find the contact info in the footer or leave a GitHub issue."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about the Product Hunt Launch Preview Tool
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="https://github.com/eylulsenakumral/product-launch-tool/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Ask on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
