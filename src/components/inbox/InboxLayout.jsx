import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { INITIAL_MESSAGES } from '../../utils/inboxData'
import InboxToolbar from './InboxToolbar'
import InboxSidebar from './InboxSidebar'
import InboxMessageList from './InboxMessageList'
import InboxReadingPane from './InboxReadingPane'
import ComposeModal from './ComposeModal'
import useSoundEffects from '../../hooks/useSoundEffects'
import usePageSEO from '../../hooks/usePageSEO'
import '../../styles/inbox.css'

export default function InboxLayout({
  onViewProject,
  onNavigateRoute,
  onOpenDepartments,
  onOpenProjects,
  onOpenLab
}) {
  usePageSEO({
    title: "Dolapo's Design Lab: Inbox Workspace",
    description: "What if my portfolio were an inbox full of interesting conversations, client feedback, projects, and opportunities?"
  })

  const { playClick } = useSoundEffects()

  // Message store
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('dolapo-inbox-messages-v17')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return INITIAL_MESSAGES
  })

  // Navigation State
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState(null)

  // Layout State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Compose Modal State
  const [composeOpen, setComposeOpen] = useState(false)
  const [composeInitialSubject, setComposeInitialSubject] = useState('')
  const [composeInitialBody, setComposeInitialBody] = useState('')

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null)

  // Save message read state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dolapo-inbox-messages-v17', JSON.stringify(messages))
    } catch (e) {}
  }, [messages])

  // Toast auto-clear
  const showToast = useCallback((msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }, [])

  // Folder Counts (Inbox unread, Drafts)
  const counts = useMemo(() => {
    const unreadInbox = messages.filter(m => m.folder === 'inbox' && m.unread).length
    const drafts = messages.filter(m => m.isDraft || m.folder === 'drafts').length

    return {
      inbox: unreadInbox,
      drafts: drafts
    }
  }, [messages])

  // Real-time Message Filtering
  const filteredMessages = useMemo(() => {
    const hasSearch = Boolean(searchQuery.trim())

    return messages.filter(msg => {
      // 1. Folder filter (bypassed if global search is active)
      if (!hasSearch) {
        if (activeFolder === 'inbox' && msg.folder !== 'inbox') return false
        if (activeFolder === 'drafts' && !(msg.isDraft || msg.folder === 'drafts')) return false
      }

      // 2. Global search query across all content
      if (hasSearch) {
        const query = searchQuery.toLowerCase().trim()
        const matchSender = msg.sender?.toLowerCase().includes(query)
        const matchSubject = msg.subject?.toLowerCase().includes(query)
        const matchPreview = msg.preview?.toLowerCase().includes(query)
        const matchCategory = msg.category?.toLowerCase().includes(query)
        const matchTags = msg.projectPreview?.tags?.some(t => t.toLowerCase().includes(query))
        const matchBody = msg.body?.paragraphs?.some(p => p.toLowerCase().includes(query))
        const matchTestimonialQuote = msg.testimonial?.quote?.toLowerCase().includes(query)
        const matchTestimonialParas = msg.testimonial?.paragraphs?.some(p => p.toLowerCase().includes(query))
        const matchProject = msg.projectContext?.project?.toLowerCase().includes(query)
        const matchDeliverable = msg.projectContext?.deliverable?.toLowerCase().includes(query)
        const matchPeriod = msg.projectContext?.period?.toLowerCase().includes(query)
        const matchSkills = msg.skills?.some(s => s.toLowerCase().includes(query))

        if (
          !matchSender &&
          !matchSubject &&
          !matchPreview &&
          !matchCategory &&
          !matchTags &&
          !matchBody &&
          !matchTestimonialQuote &&
          !matchTestimonialParas &&
          !matchProject &&
          !matchDeliverable &&
          !matchPeriod &&
          !matchSkills
        ) {
          return false
        }
      }

      return true
    })
  }, [messages, activeFolder, searchQuery])

  // Select a message: mark it as read and open reading pane
  const handleSelectMessage = useCallback((id) => {
    setSelectedMessageId(id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m))
  }, [])

  // Reply from reading pane
  const handleComposeReply = useCallback((message) => {
    setComposeInitialSubject(`Re: ${message.subject}`)
    setComposeInitialBody(`\n\n--- On ${message.date || message.timestamp}, ${message.sender} wrote:\n> ${message.preview}`)
    setComposeOpen(true)
  }, [])

  const selectedMessage = useMemo(() => {
    return messages.find(m => m.id === selectedMessageId) || null
  }, [messages, selectedMessageId])

  return (
    <div className="inbox-workspace">
      {/* Top Toolbar */}
      <InboxToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        onToggleSidebar={() => {
          if (window.innerWidth <= 900) {
            setMobileSidebarOpen(!mobileSidebarOpen)
          } else {
            setSidebarCollapsed(!sidebarCollapsed)
          }
        }}
        sidebarOpen={!sidebarCollapsed}
        onComposeClick={() => {
          setComposeInitialSubject('')
          setComposeInitialBody('')
          setComposeOpen(true)
        }}
      />

      {/* Main Body */}
      <div className="inbox-body">
        {/* Left Sidebar: Inbox, Drafts, Departments, Projects, Book a Session */}
        <InboxSidebar
          activeFolder={activeFolder}
          onSelectFolder={(folderId) => {
            setActiveFolder(folderId)
            setSelectedMessageId(null)
          }}
          counts={counts}
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onComposeClick={() => {
            setComposeInitialSubject('')
            setComposeInitialBody('')
            setComposeOpen(true)
          }}
          onNavigateRoute={onNavigateRoute}
          onOpenDepartments={onOpenDepartments}
          onOpenProjects={onOpenProjects}
          onOpenAbout={() => onNavigateRoute('/about')}
          onOpenLab={onOpenLab}
        />

        {/* Content Area: Message List + Reading Pane */}
        <div className="inbox-content-area">
          <InboxMessageList
            messages={filteredMessages}
            selectedMessageId={selectedMessageId}
            onSelectMessage={handleSelectMessage}
            onClearSearch={() => setSearchQuery('')}
            isSplitView={Boolean(selectedMessageId)}
          />

          {selectedMessageId && (
            <InboxReadingPane
              message={selectedMessage}
              onClose={() => setSelectedMessageId(null)}
              onViewProject={onViewProject}
              onNavigateRoute={onNavigateRoute}
              onComposeReply={handleComposeReply}
              onShowToast={showToast}
              onOpenDepartments={onOpenDepartments}
              onOpenProjects={onOpenProjects}
            />
          )}
        </div>
      </div>

      {/* Mobile Floating Action Buttons (Visible when sidebar is closed and not viewing a message) */}
      {!mobileSidebarOpen && !selectedMessageId && (
        <div className="inbox-mobile-floating-actions" aria-label="Quick Actions">
          <button
            type="button"
            className="inbox-mobile-floating-btn"
            onClick={() => {
              playClick()
              onNavigateRoute('/about')
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>About Me</span>
          </button>
          <button
            type="button"
            className="inbox-mobile-floating-btn inbox-mobile-floating-btn--book"
            onClick={() => {
              playClick()
              onNavigateRoute('/book')
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Book a Session</span>
          </button>
        </div>
      )}

      {/* Compose Modal */}
      <ComposeModal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        initialSubject={composeInitialSubject}
        initialBody={composeInitialBody}
        onNavigateRoute={onNavigateRoute}
        onShowToast={showToast}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="inbox-toast" role="status">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
