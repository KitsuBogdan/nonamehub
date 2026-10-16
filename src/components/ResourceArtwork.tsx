// src/components/ResourceArtwork.tsx
import type { Resource } from "@/data/resources";

export default function ResourceArtwork({ resource }: { resource: Resource }) {
  return (
    <div className={`artwork artwork-${resource.color}`} aria-hidden="true">
      <div className="artwork-glow" />
      {resource.category === "Scripts" ? (
        <div className="code-art">
          <span>local</span> resource = <b>game</b>
          <br />
          resource.<i>Parent</i>
          <br />
          <span>return</span> resource
        </div>
      ) : resource.category === "Models" ? (
        <div className="model-art">
          <div className="model-cube model-cube-back" />
          <div className="model-cube model-cube-front" />
          <div className="model-orbit" />
        </div>
      ) : (
        <div className="ui-art">
          <div className="ui-art-top">
            <span />
            <span />
            <span />
          </div>
          <div className="ui-art-sidebar" />
          <div className="ui-art-panel">
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
      <span className="artwork-tag">{resource.tag}</span>
    </div>
  );
}
