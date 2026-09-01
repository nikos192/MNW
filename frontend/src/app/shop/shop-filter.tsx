"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct, ProductDiscovery } from "@/lib/monza-data";
import styles from "./page.module.css";

type FilterKey = "construction" | "spoke" | "character" | "form" | "diameter";
const constructionOptions = [["1-Piece Forged", "Monoblock"], ["2-Piece Forged", "Two-piece"]] as const;
const spokeOptions: ProductDiscovery["spokeStyle"][] = ["5-spoke", "Split-spoke", "Multi-spoke", "Aero"];
const characterOptions: ProductDiscovery["designCharacter"] = ["Performance", "Grand touring", "Executive", "Exotic"];
const formOptions: ProductDiscovery["visualForm"] = ["Open", "Concave", "Deep lip", "Directional", "Mesh", "Aero"];

type Filters = Record<FilterKey, string[]>;

function FilterGroup({ label, filterKey, options, filters, update }: { label: string; filterKey: FilterKey; options: ReadonlyArray<string | readonly [string, string]>; filters: Filters; update: (key: FilterKey, value: string) => void }) {
  return <fieldset className={styles.filterGroup}><legend>{label}</legend><div>{options.map((option) => {
    const [value, display] = Array.isArray(option) ? option : [option, option];
    return <label className={styles.checkOption} key={value}><input checked={filters[filterKey].includes(value)} onChange={() => update(filterKey, value)} type="checkbox" /><span>{display}</span></label>;
  })}</div></fieldset>;
}

export function ShopFilter({ products }: { products: CatalogProduct[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const diameterOptions = useMemo(() => [...new Set(products.flatMap((product) => product.diameterOptions))].sort((a, b) => parseInt(a) - parseInt(b)), [products]);
  const filters = useMemo(() => ({
    construction: searchParams.getAll("construction"),
    spoke: searchParams.getAll("spoke"),
    character: searchParams.getAll("character"),
    form: searchParams.getAll("form"),
    diameter: searchParams.getAll("diameter"),
  }), [searchParams]);

  const update = useCallback((key: FilterKey, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const values = next.getAll(key);
    next.delete(key);
    (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]).forEach((item) => next.append(key, item));
    router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const visibleProducts = products.filter((product) =>
    (!filters.construction.length || filters.construction.includes(product.series)) &&
    (!filters.spoke.length || filters.spoke.includes(product.discovery.spokeStyle)) &&
    (!filters.character.length || filters.character.some((value) => product.discovery.designCharacter.includes(value as ProductDiscovery["designCharacter"][number]))) &&
    (!filters.form.length || filters.form.some((value) => product.discovery.visualForm.includes(value as ProductDiscovery["visualForm"][number]))) &&
    (!filters.diameter.length || filters.diameter.some((value) => product.diameterOptions.includes(value)))
  );
  const activeEntries = (Object.entries(filters) as Array<[FilterKey, string[]]>).flatMap(([key, values]) => values.map((value) => ({ key, value })));

  return <div className={styles.filterShell}>
    <div className={styles.discoveryLayout}>
      <aside className={styles.filters} aria-label="Filter wheel designs">
        <div className={styles.filterTitle}><p>Refine designs</p><div>{activeEntries.length > 0 && <button onClick={() => router.replace(pathname, { scroll: false })} type="button">Clear all</button>}<button aria-expanded={filtersOpen} className={styles.mobileFilterToggle} onClick={() => setFiltersOpen((open) => !open)} type="button">{filtersOpen ? "Close" : `Show filters${activeEntries.length ? ` (${activeEntries.length})` : ""}`}</button></div></div>
        <div className={styles.filterBody} data-open={filtersOpen}>
          <FilterGroup filterKey="construction" filters={filters} label="Construction" options={constructionOptions} update={update} />
          <FilterGroup filterKey="spoke" filters={filters} label="Spoke design" options={spokeOptions} update={update} />
          <FilterGroup filterKey="character" filters={filters} label="Design character" options={characterOptions} update={update} />
          <FilterGroup filterKey="form" filters={filters} label="Visual form" options={formOptions} update={update} />
          <FilterGroup filterKey="diameter" filters={filters} label="Available diameter" options={diameterOptions} update={update} />
          <p className={styles.fitmentNote}>Filters describe design and manufacturing availability—not confirmed vehicle compatibility. Monza confirms exact fitment before production.</p>
        </div>
      </aside>
      <div className={styles.results}>
        <div className={styles.resultsHeader}><p className={styles.resultCount} aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "design" : "designs"}</p>{activeEntries.length > 0 && <div className={styles.activeFilters} aria-label="Active filters">{activeEntries.map(({ key, value }) => <button aria-label={`Remove ${value} filter`} key={`${key}-${value}`} onClick={() => update(key, value)} type="button">{value}<span aria-hidden="true">×</span></button>)}</div>}</div>
        {visibleProducts.length > 0 ? <div className={styles.grid}>{visibleProducts.map((product, index) => <ProductCard key={product.id} imageLoading={index < 3 ? "eager" : "lazy"} product={product} />)}</div> : <div className={styles.zeroState}><p className="label">No exact matches</p><h2>Try a broader design direction.</h2><p>Clear one or more filters, or send Monza a reference for a bespoke design.</p><div><button className="button-outline" onClick={() => router.replace(pathname, { scroll: false })} type="button">Clear filters</button><Link className="button-primary" href="/contact?design=custom">Start a custom design</Link></div></div>}
      </div>
    </div>
  </div>;
}
