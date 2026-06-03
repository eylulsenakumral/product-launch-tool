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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Product Launch Tool
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Draft your Product Hunt launch with live preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Export Markdown
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Clear
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
      </div>
    </div>
  )
}
