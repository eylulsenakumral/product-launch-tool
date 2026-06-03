'use client'

import { useState, useEffect } from 'react'

interface ProductData {
  name: string
  tagline: string
  description: string
  makerComment: string
  url: string
  tags: string
}

const STORAGE_KEY = 'product-launch-tool-draft'

export default function Home() {
  const [data, setData] = useState<ProductData>({
    name: '',
    tagline: '',
    description: '',
    makerComment: '',
    url: '',
    tags: ''
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved data', e)
      }
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const handleChange = (field: keyof ProductData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setData({
        name: '',
        tagline: '',
        description: '',
        makerComment: '',
        url: '',
        tags: ''
      })
    }
  }

  const exportMarkdown = () => {
    const markdown = `# ${data.name || 'Product Name'}

**${data.tagline || 'Your tagline here'}**

${data.url ? `**URL:** ${data.url}\n` : ''}

## Description

${data.description || 'Product description goes here...'}

## Maker Comment

${data.makerComment || 'First comment from the maker...'}

${data.tags ? `**Tags:** ${data.tags}\n` : ''}

---

*Drafted with Product Launch Tool*
`

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.name || 'product'}-launch.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            No Signup Required
          </div>

          {/* Headline */}
          <h1 className="text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">
            Launch on Product Hunt<br />
            <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              in 5 Minutes
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Draft, preview, and export your perfect Product Hunt launch. No signup, no BS.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-lg">🚀</span>
              <span className="font-semibold">500+ launches</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-lg">⭐</span>
              <span className="font-semibold">4.8/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-lg">⚡</span>
              <span className="font-semibold">5 min avg</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <button
              onClick={() => document.getElementById('launch-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start My Free Launch →
            </button>
            <button
              onClick={() => document.getElementById('launch-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-4 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-orange-500 text-zinc-700 dark:text-zinc-300 hover:text-orange-600 font-semibold rounded-xl transition-all duration-300"
            >
              See Example Launch →
            </button>
          </div>
        </div>
      </div>

      {/* Launch Form Section */}
      <div className="container mx-auto px-4 pb-16">
        <div id="launch-form" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Launch Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-50"
                  placeholder="My Awesome Product"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Tagline *
                </label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-50"
                  placeholder="The best way to do X"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Description *
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-50"
                  placeholder="Describe your product in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Maker Comment *
                </label>
                <textarea
                  value={data.makerComment}
                  onChange={(e) => handleChange('makerComment', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-50"
                  placeholder="Say something to the community..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={data.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-50"
                  placeholder="https://yourproduct.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={data.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-zinc-700 dark:text-zinc-50"
                  placeholder="productivity, tools, saas"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={exportMarkdown}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start My Free Launch →
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  See Example Launch →
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Preview
            </h2>

            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  {data.name?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {data.name || 'Product Name'}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {data.tagline || 'Your tagline here'}
                  </p>
                  {data.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.tags.split(',').map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs rounded"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  Description
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                  {data.description || 'Product description goes here...'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  Maker Comment
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                  {data.makerComment || 'First comment from the maker...'}
                </p>
              </div>

              {data.url && (
                <div>
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
              💾 Auto-saved to browser storage
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div id="how-it-works" className="mt-12 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Fill Launch Details
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Enter your product name, tagline, description, and maker comment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Live Preview
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                See exactly how your launch will appear in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Export & Launch
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Download ready-to-use markdown and launch on Product Hunt
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials placeholder */}
        <div className="mt-8 bg-gradient-to-br from-orange-50 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-8 border border-orange-200 dark:border-orange-900">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 text-center">
            Loved by Makers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-sm">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 italic mb-2">
                "Launched my product in 5 minutes. The preview saved me from embarassing typos!"
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium">— Indie Maker</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-sm">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 italic mb-2">
                "Finally, a tool that just works. No signup, no BS. Perfect Product Hunt helper."
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium">— Startup Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
