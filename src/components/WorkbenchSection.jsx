import React, { useState, useCallback } from 'react';
import { WORKBENCH_DRAWERS } from './workbench/workbenchData';
import { CategoryIcon, ToolBrandIcon } from './workbench/WorkbenchIcons';
import '../styles/workbench-section.css';

/**
 * WORKBENCH SECTION — "Tools on my workbench."
 *
 * Placed immediately after Selected Work on pure black #000000 background.
 * Four glossy metal drawers (Design, Build, AI Stack, Ship), chrome handles,
 * midway prompt "click on a drawer to explore", and on-click cream editorial information card.
 */

export default function WorkbenchSection() {
  // All drawers and info panel remain closed on default
  const [openDrawerId, setOpenDrawerId] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  // Toggle drawer open/close
  const handleDrawerToggle = useCallback((drawerId) => {
    setOpenDrawerId((prev) => {
      const willOpen = prev !== drawerId;
      if (!willOpen) {
        // Closing the active drawer also closes any tool info panel
        setSelectedTool(null);
        return null;
      }
      // Opening a new drawer: clear any tool card from another drawer
      setSelectedTool((curr) => {
        const newDrawer = WORKBENCH_DRAWERS.find((d) => d.id === drawerId);
        if (curr && newDrawer && newDrawer.tools.some((t) => t.id === curr.id)) {
          return curr;
        }
        return null;
      });

      // On mobile viewports, smoothly adjust to keep the opened drawer fully in view
      if (typeof window !== 'undefined' && window.innerWidth <= 860) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(`drawer-item-${drawerId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 80);
        });
      }

      return drawerId;
    });
  }, []);

  // Select a tool to inspect in the cream information panel
  const handleToolSelect = useCallback((tool) => {
    setSelectedTool(tool);
  }, []);

  // Close / clear the active tool from the information panel
  const handleCloseInfoPanel = useCallback(() => {
    setSelectedTool(null);
  }, []);

  return (
    <section
      id="workbench"
      className="workbench-section"
      aria-label="Tools on my workbench"
    >
      {/* Subtle Studio Lamp Glow in Upper Left */}
      <div className="workbench-lamp-glow" aria-hidden="true" />

      <div className="workbench-container">
        {/* Editorial Heading: Tilted Paper Strips with Modak Font */}
        <header className="workbench-header">
          <div className="workbench-strip workbench-strip--top">
            <h2 className="workbench-title-text">Tools on my</h2>
          </div>
          <div className="workbench-strip workbench-strip--bottom">
            <span className="workbench-title-text">workbench.</span>
          </div>
        </header>

        {/* Tactile prompt midway between heading and drawers */}
        <div className="workbench-explore-prompt" aria-hidden="true">
          <span className="workbench-prompt-tape" />
          <span className="workbench-prompt-text">click on a drawer to explore</span>
          <span className="workbench-prompt-arrow">&darr;</span>
        </div>

        {/* Workbench Main Stage: Centered Cabinet when closed, 2-column when tool is open */}
        <div className={`workbench-stage ${selectedTool ? 'workbench-stage--with-panel' : ''}`}>
          {/* The Physical Toolbox Cabinet with 4 Stacked Drawers */}
          <div className="workbench-toolbox-wrapper">
            <div className="workbench-cabinet">
              {WORKBENCH_DRAWERS.map((drawer) => {
                const isOpen = openDrawerId === drawer.id;

                return (
                  <div
                    key={drawer.id}
                    id={`drawer-item-${drawer.id}`}
                    className={`workbench-drawer-item ${isOpen ? 'workbench-drawer-item--open' : ''}`}
                  >
                    {/* The Metal Drawer Face Button */}
                    <button
                      type="button"
                      className={`workbench-drawer-face ${isOpen ? 'workbench-drawer-face--active' : ''}`}
                      style={{
                        background: drawer.gradient,
                        borderColor: drawer.borderColor
                      }}
                      onClick={() => handleDrawerToggle(drawer.id)}
                      aria-expanded={isOpen}
                      aria-controls={`tray-${drawer.id}`}
                      aria-label={`${drawer.name} drawer (${drawer.number}) - ${isOpen ? 'open' : 'closed'}`}
                    >
                      {/* Left: Category Icon + Bold Name */}
                      <div className="drawer-face-left">
                        <div className="drawer-category-icon-wrap">
                          <CategoryIcon type={drawer.iconType} size={22} />
                        </div>
                        <span className="drawer-category-title">{drawer.name}</span>
                      </div>

                      {/* Center: Polished Chrome Handle */}
                      <div className="drawer-handle-container" aria-hidden="true">
                        <div className="drawer-chrome-handle" />
                      </div>
                    </button>

                    {/* Open Drawer Interior: Felt Tray with Tool Icon Tiles (Tools Only) */}
                    {isOpen && (
                      <div
                        id={`tray-${drawer.id}`}
                        className="workbench-drawer-tray"
                        role="region"
                        aria-label={`${drawer.name} tools`}
                      >
                        {/* 3D Glossy Tool Icon Tiles Grid */}
                        <div className="tray-tools-grid">
                          {drawer.tools.map((tool) => {
                            const isSelected = selectedTool?.id === tool.id;

                            return (
                              <button
                                key={tool.id}
                                type="button"
                                className={`workbench-tool-tile ${isSelected ? 'workbench-tool-tile--selected' : ''}`}
                                onClick={() => handleToolSelect(tool)}
                                aria-label={`Select ${tool.name} tool`}
                                title={tool.name}
                              >
                                <div className="tool-tile-icon-wrap">
                                  <ToolBrandIcon toolId={tool.id} size={36} />
                                </div>
                                <span className="tool-tile-label">{tool.name}</span>

                                {/* Desktop Tooltip */}
                                <span className="tool-tile-tooltip" aria-hidden="true">
                                  {tool.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Desktop) & Floating Modal (Mobile): Tool Description */}
          {selectedTool && (
            <div className="workbench-info-modal-backdrop" onClick={handleCloseInfoPanel}>
              <div className="workbench-info-panel-container" onClick={(e) => e.stopPropagation()}>
                <article
                  className="workbench-info-card"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Details for ${selectedTool.name}`}
                >
                  {/* Header: Tool Icon, Title, Category Badge & Close Control */}
                  <div className="info-card-top-bar">
                    <div className="info-card-tool-badge-row">
                      <div className="info-card-icon-frame">
                        <ToolBrandIcon toolId={selectedTool.id} size={32} />
                      </div>
                      <div className="info-card-heading-group">
                        <h3 className="info-card-tool-name">{selectedTool.name}</h3>
                        <span className="info-card-category-tag">{selectedTool.category}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="info-card-close-btn"
                      onClick={handleCloseInfoPanel}
                      aria-label="Close tool details"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Body: Concise Workflow Description & How I Use It */}
                  <div className="info-card-body">
                    <p className="info-card-desc">{selectedTool.description}</p>

                    <div className="info-card-usage-section">
                      <h4 className="info-card-usage-title">How I use it</h4>
                      <ul className="info-card-usage-list">
                        {selectedTool.howIUseIt.map((item, idx) => (
                          <li key={idx} className="info-card-usage-item">
                            <span className="usage-item-check" aria-hidden="true">&#x2713;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
