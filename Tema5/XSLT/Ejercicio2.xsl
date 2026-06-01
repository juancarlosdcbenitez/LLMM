<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">
<html>
  <ul>
    <xsl:for-each select="universidad/asignaturas/asignatura">
      <li><xsl:value-of select="nombre"/></li>
    </xsl:for-each>
  </ul>
</html>
</xsl:template>

</xsl:stylesheet>
