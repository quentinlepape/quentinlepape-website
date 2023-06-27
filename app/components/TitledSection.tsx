/**
 *  @fileOverview Wraps the children elements in a titled section.
 *  @author Quentin Le Pape
 */

/**
 * Wraps the children elements in a titled section.
 * @param   {string} title the title for the section
 * @param   {React.ReactNode} children the children of the section
 *
 * @returns {JSX.Element} the titled section
 */
export default function TitledSection({
  title,
  sectionClassNames,
  titleClassNames,
  children,
}: {
  title: string;
  sectionClassNames?: string;
  titleClassNames?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className={sectionClassNames}>
      <h2 className={titleClassNames}>{title}</h2>
      {children}
    </section>
  );
}
