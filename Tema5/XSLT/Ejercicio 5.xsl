<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">
<html>
  <table border="1">
    <tr>
      <th>Nombre</th>
      <th>Créditos Teóricos</th>
      <th>Créditos Prácticos</th>
    </tr>

    <xsl:for-each select="universidad/asignaturas/asignatura">
      <tr>
        <td><xsl:value-of select="nombre"/></td>
        <td><xsl:value-of select="creditos_teoricos"/></td>
        <td><xsl:value-of select="creditos_practicos"/></td>
      </tr>
    </xsl:for-each>

  </table>
</html>
</xsl:template>

</xsl:stylesheet>
