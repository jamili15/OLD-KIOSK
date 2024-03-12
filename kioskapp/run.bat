@echo off

title API Print Service

set JAVA=java
if not "%JAVA_HOME11%" == "" set JAVA=%JAVA_HOME11%\bin\java

echo.
echo.========================================================================
echo.
echo   JAVA_HOME   : %JAVA_HOME%
echo   JAVA_OPTS   : %JAVA_OPTS%
echo   JAVA        : %JAVA%
echo   PROC_ARCH   : %PROCESSOR_ARCHITECTURE%
echo.
echo.========================================================================
echo.

start /min cmd /c "%JAVA%" %JAVA_OPTS% -jar api-print-service.jar
start /min npm run start
endlocal