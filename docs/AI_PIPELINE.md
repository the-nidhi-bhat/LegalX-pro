# AI pipeline

The production pipeline is provider-agnostic: receive a user description, normalize input, ask Gemini for strict structured output, validate against the canonical Contract IR schema, identify missing/ambiguous fields, then require human review before generating legal text or execution parameters.

Every extracted field should preserve a source passage reference. Confidence is shown only when the provider returns a supported estimate; the product never invents confidence or source locations. Malformed JSON, rate limits, missing fields, and provider outages return explicit retry/clarification states.

The current demo uses a deterministic seeded scenario and labels it `Demo scenario · deterministic output · not live AI`. This is intentional and safer than pretending a hardcoded response came from a live model.
